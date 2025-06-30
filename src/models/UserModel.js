const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Nome é obrigatório!"],
      trim: true,
    },
    userName: {
      type: String,
      required: [true, "Nome de usuário é obrigatório!"],
      minlength: [3, "Usuário deve ter no mínimo 3 caracteres"],
      maxlength: [10, "Usuário muito longo"],
      match: [/^[a-zA-Z0-9_]+$/, "Nome de usuário inválido"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email é obrigatório!"],
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Formato de e-mail inválido"],
      trim: true,
    },
    age: {
      type: Number,
      required: [true, "Idade é obrigatória!"],
      min: [12, "Idade mínima é 12 anos"],
      max: [120, "Idade máxima é 120 anos"],
      trim: true,
    },
    city: {
      type: String,
      required: [true, "Cidade é obrigatória!"],
      minlength: [2, "Cidade muito curta"],
      maxlength: [100, "Cidade muito longa"],
      trim: true,
    },
    sex: {
      type: String,
      required: [true, "Gênero é obrigatório!"],
      trim: true,
    },
    biografy: {
      type: String,
      required: [true, "Biografia é obrigatório!"],
      minlength: [10, "Biografia muito curta"],
      maxlength: [500, "Biografia muito longa"],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Senha é obrigatória!"],
      minlength: [6, "Senha deve ter no mínimo 6 caracteres"],
      select: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
