const app = require('./src/App.js')
const ConnectDB = require('./src/dataBase/Connection.js')

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    ConnectDB()
    console.log('Servidor conectado!');
})