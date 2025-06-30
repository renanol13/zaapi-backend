const userModel = require("../models/UserModel.js");
const bcrypt = require("bcrypt");

const UserController = {
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(422).json({ message: "Preencha os campos" });
      }

      const isUser = await userModel.findOne({ email });

      if (!isUser)
        return res.status(404).json({ message: "Usuário não encontrado" });

      res.json({
        message: "Usuário logado com sucesso!",
        userData: { email, password },
        token: "nchjevhehsbasxwdbcuheu",
      });
      console.log(password);
    } catch (error) {
      res.status(500).json({ message: "Erro interno!", Error: error.message });
    }
  },

  register: async (req, res) => {
    try {
      const valuesForm = [
        "name",
        "userName",
        "email",
        "age",
        "city",
        "sex",
        "biografy",
        "password",
      ];

      const dataUser = req.body;

      dataUser.userName = dataUser.userName?.toLowerCase().trim();
      dataUser.email = dataUser.email?.toLowerCase().trim();

      //Verification Form
      const isNullValueForm = valuesForm.some((value) => !dataUser[value]);

      if (isNullValueForm)
        return res.status(422).json({ message: "Prencha todos os campos!" });

      const verifyEmailExist = await userModel.findOne({
        email: dataUser.email,
      });
      if (verifyEmailExist)
        return res.status(422).json({ message: "Email já cadastrado!" });

      const verifyUserNameExist = await userModel.findOne({
        userName: dataUser.userName,
      });
      if (verifyUserNameExist)
        return res
          .status(422)
          .json({ message: "Nome de usuário já cadastrado!" });

      //Create password

      const salt = await bcrypt.genSalt(10);
      dataUser.password = await bcrypt.hash(dataUser.password, salt);

      await userModel.create(dataUser);
      res.status(202).json({
        message: "Usuário cadastrado com sucesso! Volte á tela de login.",
      });
    } catch (error) {
      if (error.name === "ValidationError") {
        const messages = Object.values(error.errors).map((err) => err.message);

        return res.status(400).json({
          message: "Erro de validação",
          errors: messages,
        });
      }
      res.status(500).json({ message: "Erro interno!", Error: error.message });
    }
  },
};

module.exports = UserController;
