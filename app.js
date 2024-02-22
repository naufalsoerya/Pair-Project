const express = require("express");
const app = express();
const port = 3000;
const routes = require('./routes/index');
const session = require('express-session')

//SET EJS
app.use(express.urlencoded({extended: true}));
app.set("view engine", "ejs");

//SET SESSION
app.use(session({
    secret: 'rahasia',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        sameSite:true
    }
}))

app.use('/',routes);

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});