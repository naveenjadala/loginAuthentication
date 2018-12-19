const {User, validateUser} = require('../models/user.module');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcryptjs');

const users = {

    saveUser: async (req, res) => {
        const { error } = validateUser(req.body);
        if(error) return res.status(400).send(error.details[0].message);

        let user = await User.findOne({phoneNumber: req.body.phoneNumber});
        if(user) return res.status(400).send("user already exist.");

        user = new User(_.pick(req.body, ['name', 'phoneNumber', 'password']));
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        await user.save();

        const token = user.generateAuthToken();

        res.header('auth_token', token).send(_.pick(user, ['_id', 'name', 'phoneNumber']));
    }
}

module.exports = users;