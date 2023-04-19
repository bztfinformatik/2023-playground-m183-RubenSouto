
const { User } = require("../models/main");

exports.login = async (req, res, next) => {

}

exports.signup = (req, res, next) => {
    const body = req.body
    
    if(body.firstname && body.lastname && body.username && body.pwd && body.avatar){
      User.create({
        firstname: body.firstname,
        lastname: body.lastname,
        username: body.username,
        //Passwort muss noch verschlüsselt werden
        pwd: body.pwd,
        avatar: body.avatar,
      })
      .then(() => {
        //User existiert noch nicht, User.create hat funktioniert
        res.status(201).json({
          statusmessage: "User posted successfully",
          user: {id: new Date().toISOString(), firstname: body.firstname, lastname: body.lastname, username: body.username, 
          pwd: body.pwd, avatar: body.avatar},
        });
      }).catch(() => {
        //User existiert schon, also wirft User.create() einen Fehler
        res.status(409).json({
          errorMessage: "User already exists."
        });
      });
    }
    else{
      res.status(500).json({
        errorMessage: "connect ECONNREFUSED 127.0.0.1:3300"
      });
    }
  };
  

exports.getUsers = async (req, res, next) => {
}