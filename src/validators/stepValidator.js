const Joi = require("joi");

const validateStep = (currentStep) => {
  if (currentStep === 0) {
    return Joi.object({
      email: Joi.string().email().required().messages({
        "string.empty": "O e-mail é obrigatório.",
        "string.email": "O e-mail deve estar em um formato válido.",
        "any.required": "O e-mail é obrigatório.",
      }),
      userName: Joi.string().min(3).max(10).required().messages({
        "string.empty": "O nome de usuário é obrigatório.",
        "string.min":
          "O nome de usuário deve ter pelo menos {#limit} caracteres.",
        "string.max": "O nome de usuário muito longo",
        "string.alphanum": "O nome de usuário só pode conter letras e números.",
        "any.required": "O nome de usuário é obrigatório.",
      }),
      name: Joi.string().min(3).required().messages({
        "string.empty": "O nome é obrigatório.",
        "string.base": "O nome deve ser um texto.",
        "string.min": "O nome deve ter pelo menos {#limit} caracteres.",
        "any.required": "O nome é obrigatório.",
      }),
    });
  }

  if (currentStep === 1) {
    return Joi.object({
        city: Joi.string().min(3).max(100).required().messages({
        "string.base": "A cidade deve ser um texto.",
        "string.empty": "Cidade é obrigatória!",
        "string.min": "Cidade muito curta.",
        "string.max": "Cidade muito longa.",
        "any.required": "Cidade é obrigatória!",
      }),
      age: Joi.number().min(10).max(100).required().messages({
        "number.base": "A idade deve ser um número.",
        "number.empty": "A idade é obrigatória.",
        "number.min": "Idade mínima é 12 anos.",
        "number.max": "Idade máxima é 120 anos.",
        "any.required": "Idade é obrigatória!",
      }),
    
      sex: Joi.string().required().messages({
        "string.base": "Gênero deve ser um texto.",
        "string.empty": "Gênero é obrigatório!",
        "any.required": "Gênero é obrigatório!",
      }),
      biography: Joi.string().min(10).max(100).required().messages({
        "string.empty": "Biografia é obrigatória!",
        "string.min": "Biografia muito curta.",
        "string.max": "Biografia muito longa.",
        "any.required": "Biografia é obrigatória!",
      }),
    });
  }

  if (currentStep === 2) {
    return Joi.object({
      password: Joi.string().min(6).required().messages({
        "string.empty": "Senha é obrigatória!",
        "any.required": "Senha é obrigatória!",
        "string.min": "Senha deve conter no minímo 6 caracteres",
      }),
    });
  }
};

module.exports = validateStep;
