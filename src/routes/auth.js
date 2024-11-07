import { Router } from "express";
import passport from "passport";

const authRouter = Router();

authRouter.get("/status", (req, res) => {
  console.log("inside /status", req.user);
  console.log(req.session);

  return req.user ? res.send(req.user) : res.sendStatus(401);
});

// google
authRouter.get("/google", passport.authenticate("google"));
authRouter.get(
  "/google/redirect",
  passport.authenticate("google"),
  (req, res) => {
    console.log(req.session);
    console.log(req.user);

    res.sendStatus(200);
  },
);

authRouter.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);

    // Clear all session from Server
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Failed to remove Session." });
      }

      // Clear Cookie from Browser
      res.clearCookie("connect.sid");

      res.json({ message: "Signed Out!" });
    });
  });
});

export default authRouter;
