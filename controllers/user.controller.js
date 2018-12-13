const {User, validateUser} = require('../models/user.module');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

const users = {

    saveUser: async (req, res) => {
        const { error } = validateUser(req.body);
        if(error) return res.status(400).send(error.details[0].message);

        let user = await User.findOne({phoneNumber: req.body.phoneNumber});
        console.log(user+"dfsdf"+User.findOne({ phoneNumber: req.body.phoneNumber }));
        if(user) return res.status(400).send("user already exist.");

        user = new User(_.pick(req.body, ['name', 'phoneNumber', 'password']));
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        // bcrypt.genSalt(10, function(err, salt) {
        //     bcrypt.hash(user.password, salt,  function(err, hash) {
        //         // Store hash in your password DB.
        //         console.log(hash);
        //         user.password = hash;
        //         // user.password.save = hash;
        //         // password = hash;
        //         console.log(user.password);
        //         user.save();
        //         return hash;
        //     });
        // });
        // console.log(password);
        // user.password = password;

        console.log("asdjasjd");
        await user.save();

        res.send(_.pick(user, ['_id', 'name', 'phoneNumber']));
    }
}

module.exports = users;