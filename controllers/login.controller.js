const {User, validate} = require('../models/user.module');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcryptjs');

const login = {

    loginUser:async (req, res) => {
        const { error } = validate(req.body);
        if(error) return res.status(400).send(error.details[0].message);

        let user = await User.findOne({phoneNumber: req.body.phoneNumber});
        if(!user) return res.status(400).send("user already exist.");

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if(!validPassword) return res.status(400).send("Invalid phonenumber or password");

        const token = user.generateAuthToken();

        // const token = jwt.sign({_id:user._id}, "jwtPrivateKey");
        res.send(token);

    }
}

module.exports = login;