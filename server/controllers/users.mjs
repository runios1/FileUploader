import prisma from "../config/prisma.mjs";
import bcrypt from "bcryptjs";
import issueJWT from "../utils/jwt.mjs";
import jsonwebtoken from "jsonwebtoken";

function loginGet(req, res) {
  return res.render("login", {
    body: {},
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

  const expSeconds = jsonwebtoken.decode(token.token).exp;

  res
    .status(200)
    .cookie("jwt", token.token, {
      httpOnly: true,
      sameSite: "strict",
      expires: new Date(expSeconds * 1000),
    })
    .json({ success: true, userEmail: user.email });
}

function logoutPost(req, res) {
  res.clearCookie("jwt").json({ success: true });
}

export { loginGet, loginPost, logoutPost };
