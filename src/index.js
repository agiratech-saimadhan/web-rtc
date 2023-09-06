const express = require("express");
const cors = require("cors");

const path = require("path");

const { pino } = require("./utils/logger");

const homeRouter = require("./routes/index");
const helloApiRouter = require("./routes/api/hello/index");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/pages"));

app.use(cors());
app.use(pino);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

app.use("/home", homeRouter);
app.use("/api", helloApiRouter);

module.exports = app;
