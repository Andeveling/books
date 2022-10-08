const express = require("express")
const morgan = require("morgan")
const path = require("path")
const app = express()

//Settings
app.set("port", 4000) //Este sera nuestro puerto
app.set("views", path.join(__dirname, "views")) //Aca le decimos donde esta la carpeta views
app.set("view engine", "ejs") //Le decimos cual sera nuestro motor de vistas

//Middlewares
app.use(morgan("dev")) // Este mid nos ayudara a ver por consola el typo de peticion y como se resuelve, 200, 404, 300
app.use(express.urlencoded({ extended: false })) //Este mid puedes entender los datos que llegan por formulario y pasarlos a json
//Routes
app.use(require("./routes/index.js"))
//Static
app.use(express.static(path.join(__dirname, "public")))

//404
app.use((req, res, next) => {
  res.status(404).send("404 no found")
})
//Export
module.exports = app
