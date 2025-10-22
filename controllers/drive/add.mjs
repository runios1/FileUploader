import { body, validationResult } from "express-validator";
import { Type } from "@prisma/client";
import multer from "multer";
import prisma from "../../config/prisma.mjs";

const upload = multer({
  dest: "C:/Users/Run/The Odin Project/Node/FileUploader/storage",
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

function addGet(req, res) {
  const errors = req.session.errors || [];
  req.session.errors = [];

  res.render("add", { dirPath: req.params.dirPath, errors: errors });
}

const addPost = [
  upload.single("file"),
  validateName,
  async (req, res) => {
    const dirPath = req.params.dirPath;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(403).json({
        errors,
      });
    }
    try {
      const type = req.file ? Type.File : Type.Folder;
      const newPath = dirPath + "-" + req.body.name;

      const duplicate = await prisma.directory.findFirst({
        where: {
          path: newPath,
          userId: req.user.id,
        },
      });

      if (duplicate) {
        res.status(403).json({
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
          userId: req.user.id,
        },
      });

      if (!directory) {
        res.status(500).json({
          errors: [
            { msg: "Could not find current directory from provided path." },
          ],
        });
      }

      const newDirectory = await prisma.directory.create({
        data: {
          name: req.body.name,
          Type: type,
          downloadLink: req.file ? req.file.path : null,
          userId: req.user.id,
          path: newPath,
          parentId: directory.id,
        },
      });

      res.status(200).json({
        newDirectory,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        errors: [{ msg: "Error creating directory. Please try again." }],
      });
    }
  },
];

export { addGet, addPost };
