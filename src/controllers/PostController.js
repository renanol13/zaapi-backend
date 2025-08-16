const postController = {
  createPost: (req, res) => {
    try {
      const { author, content } = req.body;

      if (!author || !content)
        return res.status(422).json({ message: "Preencha os campos" });

        res.status(200).json({ author, content });
    } catch (error) {
      res.status(500).json({ message: "Erro interno!", Error: error.message });
    }
  },
};

module.exports = postController;
