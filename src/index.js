import "dotenv/config";
import mongoose from "mongoose";
import { createApp } from "./createApp.js";

mongoose
  .connect(process.env.MONGODB_CONNECT)
  .then(() => {
    console.log("DB connected!");
  })
  .catch((error) => {
    console.error(error);
  });

const app = createApp();
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`listen on port ${PORT}`);
});
