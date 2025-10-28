import { body, validationResult } from "express-validator";
import { Type } from "@prisma/client";
import busboy from "busboy";
import prisma from "../../config/prisma.mjs";
import supabase from "../../config/supabase.mjs";

const validateName = [
  body("name")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Name is a required field.")
    .isLength({ max: 255 })
    .withMessage("Name should be under 256 characters.")
    .isAlphanumeric()
    .withMessage("Name should only contains English letters and numbers."),
];

function addGet(req, res) {
  res.render("add", { dirPath: req.params.dirPath });
}

const addPost = [
  // validateName,
  async (req, res) => {
    const dirPath = req.params.dirPath;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(403).json({
        errors,
      });
    }

    try {
      // Handle file upload using busboy
      const bb = busboy({ headers: req.headers });
      let fileBuffer;
      let isFile = false;

      bb.on("file", (name, file, info) => {
        isFile = true;
        const chunks = [];

        // Check file size as it's being streamed
        let size = 0;
        file.on("data", (chunk) => {
          size += chunk.length;
          if (size > 2000000) {
            // 2MB limit
            file.destroy(new Error("File too large"));
            return res.status(413).json({
              errors: [{ msg: "File upload size should be smaller than 2MB." }],
            });
          }
          chunks.push(chunk);
        });

        file.on("end", () => {
          fileBuffer = Buffer.concat(chunks);
        });
      });

      bb.on("finish", async () => {
        const newPath = dirPath + "/" + req.body.name;
        const type = isFile ? Type.File : Type.Folder;

        // Check for duplicates
        const duplicate = await prisma.directory.findFirst({
          where: {
            path: newPath,
            userId: req.user.id,
          },
        });

        if (duplicate) {
          return res.status(403).json({
            errors: [
              {
                msg: "Directory can't have the same name as another directory in the same folder.",
              },
            ],
          });
        }

        // Find parent directory
        const directory = await prisma.directory.findFirst({
          where: {
            path: dirPath,
            userId: req.user,
          },
        });

        if (!directory) {
          return res.status(500).json({
            errors: [
              { msg: "Could not find current directory from provided path." },
            ],
          });
        }

        if (isFile) {
          const { error } = await supabase.storage
            .from("files")
            .upload(`${req.user}/${newPath}`, fileBuffer, {
              contentType: "application/octet-stream",
            });

          if (error) {
            console.error(error);
            return res.status(500).json({
              errors: [{ msg: "Error while uploading file to Supabase." }],
            });
          }
        }

        const newDirectory = await prisma.directory.create({
          data: {
            name: req.body.name,
            Type: type,
            userId: req.user,
            path: newPath,
            parentId: directory.id,
          },
        });

        res.status(200).json({
          newDirectory,
        });
      });

      req.pipe(bb);
    } catch (err) {
      console.error(err);
      res.status(500).json({
        errors: [{ msg: "Error creating directory. Please try again." }],
      });
    }
  },
];

export { addGet, addPost };
