import passport from "passport";
import { Strategy } from "passport-google-oauth20";
import { UserSchema } from "../mongoose/schemas/user.js";

passport.serializeUser((user, done) => {
  console.log(`Inside Serialize User`);
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const findUser = await UserSchema.findById(id);
    return findUser ? done(null, findUser) : done(null, null);
  } catch (err) {
    done(err, null);
  }
});

export default passport.use(
  new Strategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_REDIRECT_URL,
      passReqToCallback: true,
      scope: ["profile", "email"],
    },
    async (request, accessToken, refreshToken, profile, done) => {
      console.log(profile);

      let findUser;
      try {
        findUser = await UserSchema.findOne({ email: profile._json.email });
      } catch (err) {
        return done(err, null);
      }
      try {
        console.log("profile email:", profile._json.email);

        if (!findUser) {
          const newUser = new UserSchema({
            email: profile._json.email,
            name: profile.displayName,
          });
          const newSavedUser = await newUser.save();
          return done(null, newSavedUser);
        }
        return done(null, findUser);
      } catch (err) {
        console.log(err);
        return done(err, null);
      }
    },
  ),
);
