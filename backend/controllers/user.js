
const { User } = require("../models/main");
const bcrypt = require("bcrypt")
const saltRounds = 10
var jwt = require('jsonwebtoken');

exports.login = async (req, res, next) => {
  const body = req.body;
  const user = await User.findOne({ where: {username: body.username} });
  const validPwd = await bcrypt.compare(body.pwd, user.pwd)
  if (validPwd) {
    console.log(validPwd)
    res.status(201).json({
      statusmessage: "User eingeloggt",
      user: { avatar: user.avatar, id: user.id, firstname: user.firstname, lastname: user.lastname, username: user.username},
      jwt: jwt.sign(
        { username: user.username },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      )
    });
  }
  else{
    res.status(401).json({
      errorMessage: "Authentication failed."
    })
  }

}

exports.signup = (req, res, next) => {
  const body = req.body
  
  if(body.firstname && body.lastname && body.username && body.pwd && body.avatar){
    bcrypt.hash(body.pwd, saltRounds).then((hash) =>{
      User.create({
        firstname: body.firstname,
        lastname: body.lastname,
        username: body.username,
        //Passwort muss noch verschlüsselt werden
        pwd: hash,
        //pwd: body.pwd,
        avatar: body.avatar,
      })
      .then(() => {
        //User existiert noch nicht, User.create hat funktioniert
        res.status(201).json({
          statusmessage: "User posted successfully",
          user: {id: new Date().toISOString(), firstname: body.firstname, lastname: body.lastname, username: body.username, 
          pwd: body.pwd, avatar: body.avatar}
        });
      }).catch((err) => {
        //User existiert schon, also wirft User.create() einen Fehler
        console.log(err)
        res.status(409).json({
          errorMessage: "User already exists."
        });
      });
    })   
  }
  else{
    res.status(500).json({
      errorMessage: "connect ECONNREFUSED 127.0.0.1:3300"
    });
  }
};

exports.getUsers = async (req, res, next) => {
}