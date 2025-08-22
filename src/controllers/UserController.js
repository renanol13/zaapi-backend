const userModel = require("../models/UserModel.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validateStep = require("../validators/stepValidator.js");

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
    "biography",
    "password",
  ];

  const isNullValueForm = valuesForm.some((value) => !dataUser[value]);

  return isNullValueForm;
};

const verifyEmailExist = async (email) => {
  return await userModel.findOne({ email });
};

const verifyUserNameExist = async(userName) => {
    return await userModel.findOne({ userName });
}

const UserController = {
  login: async (req, res) => {
    try {
      let { email, password } = req.body;
      email = email?.toLowerCase().trim();

      if (!email || !password) {
        return res.status(422).json({ message: "Preencha os campos" });
      }

      const user = await verifyEmailExist(email);

      if (!user)
        return res.status(404).json({ message: "Usuário não encontrado!" });

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

      getUser = await userModel.create(dataUser);
      const token = setToken(dataUser);
      res.status(200).json({
        message: "Usuário logado com sucesso!",
        token: token,
        userData: {
          _id: getUser._id,
          name: getUser.name,
          email: getUser.email,
          userName: getUser.userName,
        },
      });
    } catch (error) {
      console.log(error);
      
      res.status(500).json({ message: "Erro interno!", Error: error.message });
    }
  },

  //validate step
  validateUser: async (req, res) => {
    try {
      const dataUser = req.body;

      const currentStep = Number(req.params.step);

      if (currentStep === 0) {
        dataUser.userName = dataUser.userName?.toLowerCase().trim();
        dataUser.email = dataUser.email?.toLowerCase().trim();

        if (await verifyEmailExist(dataUser.email))
          return res.status(422).json({ message: "Email já cadastrado!" });

        if (await verifyUserNameExist(dataUser.userName))
          return res
            .status(422)
            .json({ message: "Nome de usuário já cadastrado!" });
      }

      let schema;
      schema = validateStep(currentStep);
      const { error } = schema.validate(dataUser, { abortEarly: false });
      if (error) {
        const errors = {};
        error.details.forEach((err) => (errors[err.path] = err.message));
        return res.status(422).json({ message: error.details[0].message });
      }

      res.status(200).json({ message: "Etapa válida" });
    } catch (error) {
      console.log(error);

      res.status(500).json({ message: "Erro interno!", Error: error.message });
    }
  },
};

module.exports = UserController;
