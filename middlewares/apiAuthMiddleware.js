import jwt from "jsonwebtoken";
import mapCookies from "../cookie.js";
const secretKey = "financy";

const apiAuthMiddleware = (req, res, next) => {
  const cookieString = req.headers["cookie"];
  const cookies = mapCookies(cookieString);

  if (!cookies?.auth) {
    res.sendStatus(401);
    return;
  }

  jwt.verify(cookies.auth, secretKey, (err, user) => {
    if (err) {
      res.sendStatus(401);
    } else {
      req.user = user;
      next();
    }
  });
};

export default apiAuthMiddleware;
