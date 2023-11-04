if (process.env.NODE_ENV !== "Production") {
  require("dotenv").config();
}
const express = require("express");
const app = express();
const routerApp = require("./routers/router");
const errorHandler = require("./middlewares/errorHandler");

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(routerApp);
app.use(errorHandler);

module.exports = app;
