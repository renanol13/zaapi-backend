const userModel = require("../models/UserModel.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//Generation token
const setToken = (user) => {
  const token = jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      userName: user.userName,
    },
    process.env.SECRET,
    { expiresIn: "1h" }
  );
  return token;
};

const verifyFieldsExist = (dataUser) => {
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

  const isNullValueForm = valuesForm.some((value) => !dataUser[value]);

  return isNullValueForm;
};

const verifyEmailExist = async (email) => {
  return await userModel.findOne({ email });
};

const verifyUserNameExist = async (userName) => {
  return await userModel.findOne({ userName });
};

const UserController = {
  login: async (req, res) => {
    try {
      let { email, password } = req.body;
      email = email?.toLowerCase().trim();

      if (!email || !password) {
        return res.status(422).json({ message: "Preencha os campos" });
      }

      const user = verifyEmailExist(email);

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
      const dataUser = req.body;

      dataUser.userName = dataUser.userName?.toLowerCase().trim();
      dataUser.email = dataUser.email?.toLowerCase().trim();

      //Verification Form

      if (verifyFieldsExist(dataUser))
        return res.status(422).json({ message: "Prencha todos os campos!" });

      if (await verifyEmailExist(dataUser.email))
        return res.status(422).json({ message: "Email já cadastrado!" });

      if (await verifyUserNameExist(dataUser.userName))
        return res
          .status(422)
          .json({ message: "Nome de usuário já cadastrado!" });

      //Create password

      const salt = await bcrypt.genSalt(10);
      dataUser.password = await bcrypt.hash(dataUser.password, salt);

      // outhers validators

      await userModel.create(dataUser);
      res.status(202).json({
        message: "Usuário cadastrado com sucesso! Volte á tela de login.",
      });
    } catch (error) {
      res.status(500).json({ message: "Erro interno!", Error: error.message });
    }
  },

  //validate step
  validateUser: async (req, res) => {
    try {
      const dataUser = req.body;

      const currentStep = Number(req.params.step);

      if (currentStep === 1) {
        dataUser.userName = dataUser.userName?.toLowerCase().trim();
        dataUser.email = dataUser.email?.toLowerCase().trim();

        if (await verifyEmailExist(dataUser.email))
          return res.status(422).json({ message: "Email já cadastrado!" });

        if (await verifyUserNameExist(dataUser.userName))
          return res
            .status(422)
            .json({ message: "Nome de usuário já cadastrado!" });
      }

      const { error } = schema.validate(dataUser, { abortEarly: false });
      if (error) {
        const errors = {};
        error.details.forEach((err) => (errors[err.path] = err.message));
        return res.status(422).json({ message: errors });
      }
      console.log(dataUser);

      res.status(200).json({ message: "Etapa válida" });
    } catch (error) {
      res.status(500).json({ message: "Erro interno!", Error: error.message });
    }
  },
};

module.exports = UserController;
