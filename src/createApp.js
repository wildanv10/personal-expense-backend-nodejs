import mongoose from "mongoose";
import express from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";
import cors from "cors";
import router from "./routes/index.js";
import compression from "compression";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import "./strategies/googleStrategy.js";

export function createApp() {
  const app = express();

  // middleware
  app.use(compression());
  app.use(helmet());
  app.use(express.json());

  const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    limit: 20,
  });
  app.use(limiter);

  app.use(
    session({
      secret: "Wildan Novaldi",
      saveUninitialized: true,
      resave: false,
      cookie: {
        maxAge: 60000 * 60 * 24,
        httpOnly: true,
        secure: true,
        sameSite: "none",
      },
      store: MongoStore.create({
        client: mongoose.connection.getClient(),
      }),
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());

  app.use(
    cors({
      origin: process.env.CLIENT_URL,
      credentials: true,
    }),
  );

  app.use(router);

  return app;
}
