const route = require("express").Router();
const UserController = require("../controllers/UserController");

route
  .post("/auth/login", (req, res) => UserController.login(req, res))
  .post("/auth/register", (req, res) => UserController.register(req, res))
  .post("/auth/validate-step/:step", (req, res) =>
    UserController.validateUser(req, res)
  );

module.exports = route;
