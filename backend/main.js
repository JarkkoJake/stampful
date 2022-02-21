//const { request } = require('http');

const express = require('express'), app = express(), port = 5000,
    auctionRouter = require('./routes/auctionRoutes'),
    dropdownRouter = require('./routes/dropdownRoutes'),
    loginRouter = require('./routes/loginRoutes'),
    cors = require('cors'),
    fileupload = require("express-fileupload");

const allowedOrigins = ['http://localhost:3000'];

const options = {
    origin: allowedOrigins
};

app.use(fileupload());
app.use(cors(options));
app.use(express.json());


app.use('/auctions', auctionRouter.router);
app.use('/dropdown', dropdownRouter.router);
app.use("/login", loginRouter.Router);

app.listen(port, () => {
    console.log('Server running on port ' + port);
});