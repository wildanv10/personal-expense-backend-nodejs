import mongoose from "mongoose";
import express from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";
import cors from "cors";
import router from "./routes/index.js";
import "./strategies/googleStrategy.js";

export function createApp() {
  const app = express();

  // middleware
  app.use(express.json());

  app.use(
    session({
      secret: "Wildan Novaldi",
      saveUninitialized: true,
      resave: false,
      cookie: {
        maxAge: 60000 * 60,
      },
      store: MongoStore.create({
        client: mongoose.connection.getClient(),
      }),
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());

  app.use(router);

  app.use(
    cors({
      origin: process.env.CLIENT_URL,
      credentials: true,
    }),
  );

  return app;
}
