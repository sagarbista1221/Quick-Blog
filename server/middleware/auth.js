// import jwt from "jsonwebtoken";

// const auth = (req, res, next) => {
//   try {
//     // Accept either "Bearer <token>" or just "<token>"
//     const authHeader = req.headers.authorization || req.headers.Authorization;
//     if (!authHeader) {
//       return res
//         .status(401)
//         .json({ success: false, message: "No token provided" });
//     }

//     const token = authHeader.startsWith("Bearer ")
//       ? authHeader.split(" ")[1]
//       : authHeader;

//     if (!token) {
//       return res
//         .status(401)
//         .json({ success: false, message: "No token provided" });
//     }

//     // Verify token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     // attach admin info to req if needed
//     req.admin = decoded;
//     next();
//   } catch (error) {
//     return res.status(401).json({ success: false, message: "Invalid token" });
//   }
// };

// export default auth;

import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  try {
    // Accept either "Bearer <token>" or just "<token>"
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader) {
      return res
        .status(401)
        .json({ success: false, message: "No token provided" });
    }

    const token = authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : authHeader;

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "No token provided" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Backward compatibility (you were using req.admin)
    req.admin = decoded;

    // Also expose normalized user info for general use
    // Works with tokens like { _id, id, role, ... } or { user: { _id, ... } }
    const userObj = decoded?.user || decoded || {};
    req.user = userObj;
    req.userId = userObj._id || userObj.id || decoded._id || decoded.id;

    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};

export default auth;
