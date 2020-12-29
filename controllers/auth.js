const User = require("../models/user");
const jwt = require("jsonwebtoken"); // to generate signed token
const expressJwt = require("express-jwt"); // for authorization check
const { errorHandler } = require("../helpers/dbErrorHandler");

// middlewares rest mo interceptor de la ruta
exports.signup = (req, res) => {
    const user = new User(req.body);
    console.log(user);

    user.save((err, user) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        //guardamos en caso de no tener error
        user.salt = undefined; //Los saltos no interesan
        user.hashed_password = undefined;
        res.json({
            user
        });
    });
};

exports.signin = (req, res) => {
    // find the user based on email
    const { email, password } = req.body;
    User.findOne({ email }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "User with that email does not exist. Please signup"
            });
        }
        // if user is found make sure the email and password match
        // create authenticate method in user model
      /*  if (!user.authenticate(password)) {
            return res.status(401).json({
                error: "Email and password dont match"
            });
        }*/
        
        // generate a signed token with user id and secret
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
        // persist the token as 't' in cookie with expire date
        res.cookie("t", token, { expire: new Date() + 9999 });
        // return response with user and token to frontend client
        const { _id, name, email, role } = user;
        return res.json({ token, user: { _id, name, email, role } });
    });
};


exports.signout = (req, res) => {
    res.clearCookie("t");//limpia las cookies en este caso la t donde teniamos guardado el token
    res.json({ message: "Signout success" });
};

exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    userProperty: "auth"
});

exports.isAuth = (req, res, next) => {
   /* console.log(req.profile);
    console.log(req.auth._id);
    console.log("acceso");*/
    let user = req.profile && req.auth && req.profile._id == req.auth._id;
    if (!user) {
        return res.status(403).json({
            error: "Access denied"
        });
    }
    next();
};

exports.isAdmin = (req, res, next) => {
    if (req.profile.role === 0) { // el profile es el documento o Schema admin es 1
        return res.status(403).json({
            error: "Admin resourse! Access denied"
        });
    } 
    next();
};