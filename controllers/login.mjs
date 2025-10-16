import passport from "../config/passport.mjs";

function loginGet(req, res) {
  const errors = req.session.messages || [];
  // Clear the messages after reading them
  req.session.messages = [];
  return res.render("login", {
    body: {},
    errors: errors.map((msg) => ({ msg })),
  });
}

const loginPost = passport.authenticate("local", {
  failureRedirect: "/login",
  successRedirect: "/",
  failureMessage: true,
});

export { loginGet, loginPost };
