const app = require('./src/App.js')
const ConnectDB = require('./src/dataBase/Connection.js')

const PORT = process.env.PORT || 3000

app.listen(PORT, '0.0.0.0',() => {
    ConnectDB()
    console.log('Servidor conectado!');
})