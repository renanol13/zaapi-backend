const userModel = require("../models/UserModel.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const setToken = (user) => {
  const token = jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      userName: user.userName,
    },
    process.env.SECRET,
    {expiresIn: '1h'}
  );
  return token;
};

const UserController = {
  login: async (req, res) => {
    try {
      let { email, password } = req.body;
      email = email?.toLowerCase().trim();

      if (!email || !password) {
        return res.status(422).json({ message: "Preencha os campos" });
      }

      const user = await userModel.findOne({ email });

      if (!user)
        return res.status(404).json({ message: "Usuário não encontrado" });

      //check password
      if (!(await bcrypt.compare(password, user.password)))
        return res.status(404).json({ message: "Email ou senha incorretos!" });

      const token = setToken(user);
      res.status(200).json({
        message: "Usuário logado com sucesso!",
        token: token,
        userData: {
          _id: user._id,
          name: user.name,
          email: user.email,
          userName: user.userName,
        },
      });

   
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
