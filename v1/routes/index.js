const config = require('../../config/config.json');
const express = require("express");

const ruser = require("./user");
const rpage = require("./page");
const rauth = require("./auth");
const rnode = require("./node");
const rrole = require("./role");

module.exports = function (app) {
  // pas sur d'en avoir besoin a cause de vue-cli, a voir
  let routerApi = express.Router();
  let apiUrl = "/api/v" + config.version;

  routerApi.verifToken = verifToken;

  routerApi.use("*", (req, res, next) => {
      console.log(req.originalUrl);
      next();
  });

  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
       next();
 });

  routerApi.use("/", rauth);
  routerApi.use("/users", ruser);
  routerApi.use("/pages", rpage);
  routerApi.use("/nodes", rnode);
  routerApi.use("/roles", rrole);

  app.use(apiUrl, routerApi);

  app.use(apiUrl + "/test", (req, res) => {
    res.send("server api is ok, good enjoy !!");
  });

  /**
   * Page not found middleware
   */
  app.use((req, res, next) => {
    res.status(404).send('404 Not Found');
  });
  /**
   * Error middleware
   */
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('500 Server Error');
  });
  console.log("ok");
};


let verifToken = (req, res, next) => {
  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  // decode token
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, "shhhhh", function (err, decoded) {
      if (err) {
        return res.json({
          success: false,
          message: 'Failed to authenticate token.'
        });
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.status(403).send({
      success: false,
      message: 'No token provided.'
    });
  }
};

let verifPermissions = (user, action, model) => {
  let roles = ["visiteur", "inscrit", "redacteur", "moderateur", "admin", "dev", "dieu"];
  let role = req.session.user.role;
};