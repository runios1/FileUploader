function indexGet(req, res) {
  return res.render("index");
}

function logoutGet(req, res) {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    return res.redirect("/");
  });
}

export { indexGet, logoutGet };
