const usersCtrl = {};

const User = require('../models/User');

const passport = require('passport');

usersCtrl.renderSignupForm = (req, res) => {
    res.render('users/signup');
};

usersCtrl.signup = async (req, res) => {
    const errors = [];

    const { name, email, password, confirm_password } = req.body;
    if (password != confirm_password) {
      errors.push({ text: "La contraseña no coincide" });
    }
    if (password.length < 4) {
      errors.push({ text: "La contraseña debe tener al menos 4 caracteres" });
    }
    if (errors.length > 0) {
      res.render("users/signup", {
        errors,
        name,
        email,
        password,
        confirm_password
      });
    } else {
        const emailUser = await User.findOne({email: email});
        if (emailUser) {
            req.flash('error_msg', 'El correo ya esta en uso');
            res.redirect('/users/signup');
        } else {
            const newUser = new User({name, email, password});
            newUser.password = await newUser.encryptPassword(password);
            await newUser.save();
            req.flash('success_msg', 'Estas registrado')
            res.redirect('/users/signin');
        }
    }
};

usersCtrl.renderSigninForm = (req, res) => {
    res.render('users/signin');

};

usersCtrl.signin = passport.authenticate("local", {
  successRedirect: "/notes",
  failureRedirect: "/users/signin",
  failureFlash: true
});

usersCtrl.logout = (req, res) => {
    req.logout();
    req.flash('success_msg', 'Cerraste sesion exitosamente!');
    res.redirect('/users/signin');
}

module.exports = usersCtrl;