import { body, validationResult } from "express-validator";
import { Type } from "@prisma/client";
import multer from "multer";
import prisma from "../../config/prisma.mjs";
import supabase from "../../config/supabase.mjs";

const upload = multer({
  storage: multer.memoryStorage(),
});

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

const addPost = [
  upload.single("file"),
  validateName,
  async (req, res) => {
    const dirPath = req.params.dirPath.toString().replace(",", "/");
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(403).json({
        errors,
      });
    }
    try {
      const type = req.file ? Type.File : Type.Folder;
      const newPath = dirPath + "/" + req.body.name;

      const duplicate = await prisma.directory.findFirst({
        where: {
          path: newPath,
          userId: req.user,
        },
      });

      if (duplicate) {
        return res.status(403).json({
          errors: [
            {
              msg: "Directory can't be with the same name as another directory in the same folder.",
            },
          ],
        });
      }

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

      if (type === Type.File) {
        const { data, error } = await supabase.storage
          .from("files")
          .upload(
            `${req.user}/${directory.path}/${req.body.name}`,
            req.file.buffer,
            {
              contentType: req.file.mimetype,
            }
          );
        if (error) {
          return res.status(500).json({
            errors: [
              {
                msg:
                  "Could not upload file to supabase bucket. " + error.message,
              },
            ],
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

      return res.status(200).json({ newDirectory });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        errors: [{ msg: "Error creating directory. Please try again." }],
      });
    }
  },
];

export { addPost };
