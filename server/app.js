const express = require("express");
let usersController = require("./controller/users-controller")
let carsController = require("./controller/cars-controller")
let ordersController = require("./controller/orders-controller")
const loginFilter = require('./middleware/login-filter');
const errorHandler = require("./errors/error-handler");

const server = express();

const port = process.env.PORT || 3001;
const cors = require('cors');

const path = require("path")
// server.use(express.static(path.join(__dirname,"build")));


server.use(cors())
server.listen(port, () => console.log('Server started on port' + port));

server.use(express.json());
server.use(express.static('assets'));

// server.use(loginFilter());
server.use("/users", usersController);
server.use("/cars", carsController);
server.use("/orders", ordersController);
server.use(errorHandler)

// server.get("*",function(req, res){
//     res.sendFile(path.join(__dirname,"build","index.html"))
// })



