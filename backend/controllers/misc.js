const { head } = require("../routes/main");
const { HTTP_STATUS_OK } = require("../util/const");
const { User } = require("../models/main");

exports.getHelloWorld = (req, res, next) => {
  res.status(200).json({
    message: "Hello World",
  });
};

exports.default = (req, res, next) => {
  res.status(HTTP_STATUS_OK).json({});
};

exports.postMessage = (req, res, next) => {
  const header = req.body.header;
  const content = req.body.content;

  res.status(201).json({
    statusmessage: "Message posted successfully",
    post: { id: new Date().toISOString(), header: header, content: content },
  });
};

exports.postUser = (req, res, next) => {
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
        user: { id: new Date().toISOString(), firstname: body.firstname, lastname: body.lastname, username: body.username, 
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
