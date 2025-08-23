const router = require("express").Router();

const postController = require("../controllers/PostController");
const checkToken = require("../middlewares/AuthMiddleware");

router.get("/", checkToken, (req, res) => postController.getAllPosts(req, res));

router.post("/create", checkToken, (req, res) =>
  postController.createPost(req, res)
);

module.exports = router;
