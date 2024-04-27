const initialRouteMiddleware = (req, res, next) => {
  if (!req.session.isAuthenticated) {
    next();
  } else {
    res.redirect("/admin");
  }
};

export default initialRouteMiddleware;
