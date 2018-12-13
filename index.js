const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const userRouter = require('./routes/user.router');
const loginRouter = require("./routes/login.router");



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
