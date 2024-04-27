const authMiddleware = (req, res, next) => {
  if (!req.session.isAuthenticated) {
    res.redirect("/");
  } else {
    next();
  }
};

export default authMiddleware;
