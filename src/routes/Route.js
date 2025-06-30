const route = require("express").Router();

//User Router
const userRouter = require("./UserRouter");
route.use("/", userRouter);

module.exports = route;
