import prisma from "../config/prisma.mjs";
import bcrypt from "bcryptjs";
import { body, validationResult } from "express-validator";
import { Type } from "@prisma/client";

const validateUser = [
  body("email")
    .trim()
    .isEmail()
    .withMessage("Enter a valid email address.")
    .isLength({ max: 255 })
    .withMessage("Email address was too long."),
  body("password")
    .isLength({ min: 1, max: 255 })
    .withMessage("Password must be between 1 and 255 characters long."),
  body("confirm")
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage("Confirm password did not match original."),
];

function registerGet(req, res) {
  return res.render("register", { body: {} });
}

const registerPost = [
  validateUser,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("register", {
        body: req.body || {},
        errors: errors.array(),
      });
    }
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      // Transaction to ensure both operations succeed or fail together
      await prisma.$transaction(async (tx) => {
        const directory = await tx.directory.create({
          data: {
            Type: Type.Folder,
          },
        });

        const user = await tx.user.create({
          data: {
            email: req.body.email,
            password: hashedPassword,
            mainDirectoryId: directory.id,
          },
        });

        await tx.directory.update({
          where: { id: directory.id },
          data: { userId: user.id },
        });
      });

      res.redirect("/login");
    } catch (error) {
      console.error(error);
      return res.status(500).render("register", {
        body: req.body || {},
        errors: [{ msg: "Error creating user. Please try again." }],
      });
    }
  },
];

export { registerGet, registerPost };
