const postModel = require("../models/PostModel");
const userModel = require("../models/UserModel");

const postController = {
  createPost: async (req, res) => {
    try {
      const { content } = req.body;

      if (!content)
        return res.status(422).json({ message: "Preencha os campos" });

      const post = await postModel.create({
        author: req.userId,
        content,
      });

      res.status(200).json({ message: "Post criado!", post });
    } catch (error) {
      console.log(error);

      res
        .status(500)
        .json({ message: "Erro no servidor!", Error: error.message });
    }
  },

  getAllPosts: async (req, res) => {
    try {
      const response = await postModel.find().populate('author', "userName name");

      

      res.status(200).json(response );
    } catch (error) {
      console.log(error);

      res
        .status(500)
        .json({ message: "Erro no servidor!", Error: error.message });
    }
  },
};

module.exports = postController;
