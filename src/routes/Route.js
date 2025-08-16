const route = require("express").Router();

//User Router
const userRouter = require("./UserRouter");
route.use("/", userRouter);

//Posts Router
const postRouter = require('./PostRouter')
route.use('/posts', postRouter)
module.exports = route;
