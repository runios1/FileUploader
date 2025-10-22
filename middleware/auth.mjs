import passport from "../config/passport.mjs";

const isAuth = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    console.log("Auth Error:", err);
    console.log("Auth Info:", info);

    if (err) {
      return res.status(500).json({ message: "Internal server error" });
    }
    if (!user) {
      return res.status(401).json({ message: info?.message || "Unauthorized" });
    }

    req.user = user;
    next();
  })(req, res, next);
};

export default isAuth;
