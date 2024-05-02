import jwt from "jsonwebtoken";
import mapCookies from "../cookies.js";

const secretKey = "financy";

const logoutMiddleware = (req, res, next) => {
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
      res.cookie("auth", "", { expires: new Date(0) });
      res.redirect("/");
    }
  });
};

export default logoutMiddleware;
