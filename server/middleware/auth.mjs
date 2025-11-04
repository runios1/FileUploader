import jwt from "jsonwebtoken";

const isAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token)
    return res.status(401).json({ message: "User is not logged in." });
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    req.user = data.sub; //User ID
    next();
  } catch (err) {
    return res.status(401).json({ message: err });
  }
};

export default isAuth;
