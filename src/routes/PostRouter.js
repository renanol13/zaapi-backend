const router = require("express").Router();

const postController = require("../controllers/PostController");

router.post("/create", (req, res) => postController.createPost(req, res));

module.exports = router;
