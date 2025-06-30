const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

app.use(cors());
app.use(express.json());

//All routes

const Routes = require("./routes/Route.js");
app.use("/", Routes);



console.log(valores);



module.exports = app;
