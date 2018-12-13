const {User, validate} = require('../models/user.module');
const bcrypt = require('bcryptjs');

const login = {

    loginUser:async (req, res) => {
        const { error } = validate(req.body);
        if(error) return res.status(400).send(error.details[0].message);

        let user = await User.findOne({phoneNumber: req.body.phoneNumber});
        if(!user) return res.status(400).send("user already exist.");

        const salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(req.body.password, salt);
        const validPassword = await bcrypt.compare(user.password , password);
        console.log(validPassword + user.password + password);
        if(!validPassword) return res.status(400).send("Invalid phonenumber or password");

        res.send(true);

    }
}

module.exports = login;