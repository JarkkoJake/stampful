const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.login = (req, res) => {
    const password = req.body.password;
    bcrypt.compare(password, process.env.PASSWORD).then((success) => {
        if (!success) {
            res.status(401).send("Authentication failed");
            return;
        }
        const token = jwt.sign({}, process.env.JWT, {expiresIn: "5 days"});
        res.send({accessToken: token});
    });
};