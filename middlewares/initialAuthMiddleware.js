import jwt from "jsonwebtoken";
import mapCookies from "../cookies.js";
const secretKey = "financy";

const initialRouteMiddleware = (req, res, next) => {
  const cookieString = req.headers["cookie"];
  const cookies = mapCookies(cookieString);

  if (!cookies?.auth) {
    next();
    return;
  }

  jwt.verify(cookies.auth, secretKey, (err, user) => {
    if (err) {
      next();
    } else {
      req.user = user;
      res.redirect("/admin");
    }
  });
};

export default initialRouteMiddleware;
