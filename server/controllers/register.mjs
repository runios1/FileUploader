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

const registerPost = [
  validateUser,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    try {
      // Check for duplicates
      const duplicate = await prisma.user.findFirst({
        where: {
          email: req.body.email,
        },
      });

      if (duplicate) {
        return res.status(403).json({
          errors: [
            {
              msg: "A user with the same email is already registered.",
            },
          ],
        });
      }

      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      // Transaction to ensure both operations succeed or fail together
      await prisma
        .$transaction(async (tx) => {
          const directory = await tx.directory.create({
            data: {
              name: "root",
              path: "root",
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
          return user;
        })
        .then((user) => res.status(200).json(user));
    } catch (error) {
      console.error(error);
      res.status(500).json({
        body: req.body || {},
        errors: [{ msg: "Error creating user. Please try again." }],
      });
    }
  },
];

export { registerPost };
