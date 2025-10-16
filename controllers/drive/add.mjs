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
      req.session.errors = errors;
      return res.redirect(`/add/${dirPath}`);
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
        req.session.errors = [
          {
            msg: "Directory can't be with the same name as another directory in the same folder.",
          },
        ];
        return res.redirect(`/drive/add/${dirPath}`);
      }

      const directory = await prisma.directory.findFirst({
        where: {
          path: dirPath,
          userId: req.user.id,
        },
      });

      await prisma.directory.create({
        data: {
          name: req.body.name,
          Type: type,
          downloadLink: req.file ? req.file.path : null,
          userId: req.user.id,
          path: newPath,
          parentId: directory.id,
        },
      });

      if (type === Type.Folder) res.redirect(`/drive/${newPath}`);
      else res.redirect(`/drive/${dirPath}`);
    } catch (err) {
      console.error(err);
      req.session.errors = [
        { msg: "Error creating directory. Please try again." },
      ];
      return res.redirect(`/drive/add/${dirPath}`);
    }
  },
];

export { addGet, addPost };
