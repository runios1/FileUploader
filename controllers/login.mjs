import prisma from "../config/prisma.mjs";
import bcrypt from "bcryptjs";
import issueJWT from "../utils/jwt.mjs";

function loginGet(req, res) {
  const errors = req.session.messages || [];
  // Clear the messages after reading them
  req.session.messages = [];
  return res.render("login", {
    body: {},
    errors: errors.map((msg) => ({ msg })),
  });
}

async function loginPost(req, res) {
  const user = await prisma.user.findUnique({
    where: {
      email: req.body.email,
    },
  });

  if (!user) {
    return res.status(401).json({ success: false, msg: "Wrong email" });
  }

  const match = await bcrypt.compare(req.body.password, user.password);
  if (!match) {
    return res.status(401).json({ success: false, msg: "Wrong password" });
  }

  const token = issueJWT(user);

  res.status(200).json({
    success: true,
    token: token.token,
    expiresIn: token.expiresIn,
  });
}

export { loginGet, loginPost };
