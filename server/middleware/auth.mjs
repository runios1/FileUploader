// import passport from "../config/passport.mjs";

const isAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) return res.status(401).json({ message: "Unauthorized" });
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    req.user = data;
    next();
  } catch (err) {
    return res.status(401).json({ message: err });
  }
  // passport.authenticate("jwt", { session: false }, (err, user, info) => {
  //   if (err) {
  //     return res.status(500).json({ message: "Internal server error" });
  //   }
  //   if (!user) {
  //     return res.status(401).json({ message: info?.message || "Unauthorized" });
  //   }

  //   req.user = user;
  //   next();
  // })(req, res, next);
};

export default isAuth;
