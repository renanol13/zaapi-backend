const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

app.use(cors());
app.use(express.json());

app.get('/',(req, res) => {
    res.json({msg: 'Bem-Vindo!'})
})




module.exports = app