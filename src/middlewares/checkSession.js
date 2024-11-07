export const checkSession = (req, res, next) => {
  if (req.isAuthenticated() && req.user) {
    return next();
  } else {
    return res.status(401).json({ message: "Unauthorized: No active session" });
  }
};
