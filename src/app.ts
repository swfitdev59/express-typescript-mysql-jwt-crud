import express from "express";
import cors, { CorsOptions } from "cors";
import logger from "morgan";
import bodyParser from "body-parser";
import { connectDB } from "./database/connection";
import { env } from './config/env';

const app = express();

const userRoutes = require("./routes/userRoutes");

// database setup
connectDB();

app.use(logger("dev"));

const corsOptions: CorsOptions = {
  origin: env.CLIENT,
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

app.use(
  bodyParser.urlencoded({
    limit: "100mb",
    extended: true,
    parameterLimit: 1000000,
  })
);

app.get("/", (req, res) => {
  res.send("Node.js API Server!");
});

app.use("/api/v1/users", userRoutes);

app
  .listen(env.PORT, env.HOST, () => {
    console.log(`Server running at http://${env.HOST}:${env.PORT}`);
  })
  .on("error", (err: any) => {
    if (err.code === "EADDRINUSE") {
      console.log("Error: address already in use");
    } else {
      console.log(err);
    }
  });
