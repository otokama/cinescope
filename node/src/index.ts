import cors from "cors";
import dotenv from "dotenv";
import express, { Request, Response } from "express";
import accountRouter from "./controller/accountController";
import movieController from "./controller/movieController";
import sessionRouter from "./controller/sessionController";
import tvController from "./controller/tvController";

import { jwtClient } from "./helpers/jwt";
import bodyParser = require("body-parser");
import path = require("path");
dotenv.config({
  path: path.resolve(__dirname, `../.env.${process.env.ENVIRONMENT}`),
});

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// public paths that don't require session auth token:
const publicPath: (string | RegExp)[] = [
  "/",

  "/api/session/new",
  "/api/session/auth",
  "/api/session/delete",

  /api\/movie\/discover/,
  /api\/movie\/detail/,
  /api\/movie\/search/,

  /api\/tv\/discover/,
  /api\/tv\/detail/,
  /api\/tv\/search/,

  /api\/media\/favorite/,
];
const jwt = jwtClient(publicPath);

app.use(jwt);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript Express!");
});

app.use("/api/account", accountRouter);
app.use("/api/media", accountRouter);
app.use("/api/movie", movieController);
app.use("/api/tv", tvController);
app.use("/api/session", sessionRouter);

const port = process.env.PORT ? parseInt(process.env.PORT) : 3030;
app.listen(port, "0.0.0.0", function () {
  console.log(`Server listening on port ${port}`);
});
