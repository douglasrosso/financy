import jwt from "jsonwebtoken";
import mapCookies from "../cookies.js";
const secretKey = "financy";

const authMiddleware = (req, res, next) => {
  const cookieString = req.headers["cookie"];
  const cookies = mapCookies(cookieString);

  if (!cookies?.auth) {
    res.redirect("/");
    return;
  }

  jwt.verify(cookies.auth, secretKey, (err, user) => {
    if (err) {
      res.redirect("/");
    } else {
      req.user = user;
      next();
    }
  });
};

export default authMiddleware;
