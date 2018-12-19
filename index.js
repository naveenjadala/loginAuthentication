const config = require('config');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const userRouter = require('./routes/user.router');
const loginRouter = require("./routes/login.router");


// if(!config.get('jwtPrivateKey')) {
//     console.error('FATAL ERROR: jwtPrivateKey not defined.');
//     process.exit(1);
// }

const app = express();

function callBack() {
    mongoose.connect("mongodb://localhost/petCare")
        .then(()=> console.log("db connect"))
        .catch(err => console.log("not connection"));
    console.log("server is started");
}
app.listen(4004, callBack);


app.use(bodyParser.json());
app.use("/api",userRouter);
app.use("/api", loginRouter);
