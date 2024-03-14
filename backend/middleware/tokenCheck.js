const verify = require("jsonwebtoken").verify;

const TokenCheck = (req, res, next) => {
  try {
    const token = req.headers.authorization.replace("Bearer ", "");
    verify(token, process.env.JWT);
    next();
  } catch (err) {
    console.log(err.message);
    res.status(401).send("Authentication failed");
  };
};

module.exports = TokenCheck;