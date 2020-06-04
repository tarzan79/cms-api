// const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const argon2 = require("argon2")


exports.signup = (req, res) => {
  return new Promise((resolve, reject) => {
      // verifier que les info recu sont valide (confirmation password, regex mail, password pas trop faible, etc)
      // let body = req.body;
      let errors = [];
      // console.log(body);

      /** pour le dev on peut aussi commenter de la */
      if (!req.body.username && req.body.username.length >= 3) {
        errors.push("username error format");
      } else if (
        !req.body.email &&
        !req.body.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/) // <= fuck it, it's magik XD
      ) {
        errors.push("email error format");
      } else if (!req.body.password && !req.body.password.length >= 8) {
        errors.push("password error format");
      } else if (!req.body.confirmation) {
        errors.push("require confirmation password");
      } else if (req.body.confirmation != req.body.password) {
        errors.push("password and confirmation do not match");
      } else {
        console.log("signup parameters ok");
      }
      /** à de la, mais chut */

      if (errors.length > 0) {
        reject(errors);
      }
      resolve(req.body);
    })
    .then((body) => {
      // requette pour trouver un compte deja existant
      return User.find({
        $or: [{
            username: req.body.username,
          },
          {
            email: req.body.email,
          },
        ],
      });
    })
    .then((accounts) => {
      // verifier si un compte avec le meme mail ou pseudo n'existe pas deja
      return new Promise((resolve, reject) => {
        if (accounts.length > 0) {
          const errors = [];
          accounts.forEach((account) => {
            if (account.username === req.body.username) {
              errors.push("There is already an account with this username.");
            }
            if (account.email === req.body.email) {
              errors.push("There is already an account with this email.");
            }
          });
          console.log("erreurs 1: " + errors);
          // reject(errors);
          reject(errors);
        } else {
          resolve(true);
        }
      });
    })
    .then(() => {
      // hashage du mot de passe
      return argon2.hash(req.body.password);
    })
    .then((hashedPassword) => {
      // on enregistre l'utilisateur dans la bdd
      console.log("crypted password: " + hashedPassword);
      const account = new mongoose.models.User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
      });

      return account.save();
    })
    .then((accountSaving) => {
      // on renvoie les info dont le token et on créé la session
      console.log(
        `New account: ${accountSaving.username} <${accountSaving.email}>`
      );
      var token = jwt.sign({
          foo: "bar",
        },
        "shhhhh", {
          expiresIn: "1h",
        }
      );
      let user = {
        username: accountSaving.username,
        email: accountSaving.email,
        token: token,
      };
      req.session.user = user;

      res.end(
        JSON.stringify({
          success: true,
          user: user
        })
      );
    })
    .catch((err) => {
      console.log("erreurs 2");
      console.log(err);
      // dans le cas ou y'a une erreur mais qu'elle n'est pas renvoyé par les promises
      if (typeof err == "object" && Object.entries(err).length === 0) {
        err = [];
        err.push("Error 500");
      }
      res.end(
        JSON.stringify({
          success: false,
          errors: err,
        })
      );
    });
};

exports.login = (req, res) => {
  /**
   * @type {Promise<string[]>}
   */
  return new Promise((resolve, reject) => {
      //on verifie les données passer en parametre
      if (req.body.email && req.body.password) {
        const verification = {
          isEmailError: !(
            req.body.email &&
            req.body.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
          ),
          isPasswordError: !(req.body.password && req.body.password.length >= 8),
        };
        // if (!verification.isEmailError && !verification.isPasswordError) {
        if (true) {
          resolve(true);
        } else {
          reject(["email or password bad format"]);
        }
      }
    })
    .then(() => {
      // on essaye de recuperer un compte correspondant
      return mongoose.models.User.findOne({
        email: req.body.email,
      });
    })
    .then((account) => {
      // on verifie si on a pu recuperer un compte
      return new Promise((resolve, reject) => {
        if (!account) {
          // si aucun compte n'est trouvé
          reject([
            "This credentials doesn't match with an existing account or the account doesn't exists.",
          ]);
        } else {
          resolve(account);
        }
      });
    })
    .then((account) => {
      // on verifie que le mot de passe correspond bien
      // return bcrypt.compare(req.body.password, account.password);
      const password = Buffer.from(req.body.password);
      return argon2.verify(account.password, password).then((isCorrect) => {
        if (isCorrect) {
          return new Promise((resolve, reject) => {
            console.log("Connection de: " + account.username);
            let token = jwt.sign({
                foo: "bar",
              },
              "shhhhh"
            );
            let user = {
              username: account.username,
              email: account.email
            };
            if (!req.session.user) {
              req.session.user = res.locals.user = user;
              req.session.token = res.locals.token = token;
            }

            res.send(
              JSON.stringify({
                success: true,
                user: user,
                token: token
              })
            );
            resolve(account)
          })
        } else {
          reject([
            "This credentials doesn't match with an existing account or the account doesn't exists.",
          ]);
        }
      });
    })
    .catch((err) => {
      console.log(err);
      res.end(
        JSON.stringify({
          success: false,
          errors: err,
        })
      );
    });
};

/**
 * Login action
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */

exports.logout = (req, res) => {
  req.session.destroy(function (err) {
    if (err) {
      res.send(
        JSON.stringify({
          success: false,
          errors: err,
        })
      );
    } else {
      res.end(
        JSON.stringify({
          success: true,
        })
      );
    }
  });
};