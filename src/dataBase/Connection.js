const mongoose = require("mongoose");

const password = process.env.PASSWORD;


const ConnectDB = async () => {
    try {
    await mongoose.connect(`mongodb+srv://testZaap:${password}@testezapp.q6grebg.mongodb.net/?retryWrites=true&w=majority&appName=testeZapp`);
    console.log("Conectado ao banco de dados!");
    
  } catch (error) {
    console.log(`Falha ao conectar ao banco de dados!\n ${error}`);
  }
};

module.exports = ConnectDB;
