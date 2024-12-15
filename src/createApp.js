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

  if (process.env.NODE_ENV !== "development") {
    const limiter = rateLimit({
      windowMs: 1 * 60 * 1000, // 1 minute
      limit: 20,
    });
    app.use(limiter);
    app.set("trust proxy", 1);
  }

  app.use(
    session({
      secret: "Wildan Novaldi",
      saveUninitialized: true,
      resave: false,
      cookie: {
        domain: ".codealchemy.site",
        maxAge: Number(process.env.COOKIE_MAX_AGE),
        httpOnly: Boolean(process.env.COOKIE_HTTP_ONLY),
        secure: Boolean(process.env.COOKIE_SECURE),
        sameSite: process.env.COOKIE_SAME_SITE,
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
      allowedHeaders: ["Content-Type", "Authorization"],
    }),
  );
  app.options("*", cors());

  app.use(router);
  app.get("/ip", (request, response) => {
    response.send(request.ip);
  });

  return app;
}
