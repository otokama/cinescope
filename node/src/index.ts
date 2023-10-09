import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import accountRouter from "./controller/accountController";
import movieController from "./controller/movieController";
import sessionRouter from "./controller/sessionController";
import tvController from "./controller/tvController";

// import { jwtClient } from "./helpers/jwt";
import bodyParser = require("body-parser");
import path = require("path");
dotenv.config({
  path: path.resolve(__dirname, `../.env.${process.env.ENVIRONMENT}`),
});

const app = express();

const buildPath = path.join(__dirname, "../dist/react-build");
app.use(express.static(buildPath));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use("/api/account", accountRouter);
app.use("/api/media", accountRouter);
app.use("/api/movie", movieController);
app.use("/api/tv", tvController);
app.use("/api/session", sessionRouter);

app.use("*", (req, res) => {
  res.sendFile(path.join(buildPath, "index.html"));
});

const port = process.env.PORT ? parseInt(process.env.PORT) : 3030;
app.listen(port, "0.0.0.0", function () {
  console.log(`Server listening on port ${port}`);
});
