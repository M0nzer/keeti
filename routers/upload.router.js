//Dep
const express = require('express')
, uploadRouter = express.Router()
,  fileUpload = require('express-fileupload');

uploadRouter.use(fileUpload());

const isAuth = require('../middleware/auth').auth;

//bodyParser Setup
const bodyParser = require('body-parser');
uploadRouter.use(bodyParser.urlencoded({ extended: false }));
uploadRouter.use(bodyParser.json());

//setup cookieParser
const cookieParser = require('cookie-parser');
uploadRouter.use(cookieParser());

uploadRouter.post('/upload',isAuth , (req , res)=>{

  let File = req.files.sampleFile;
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');

  }

  let filePath = req.query.path;

    File.mv( filePath + File.name, function(err) {
      if (err)
        return res.status(500).send("false");
      else
        return res.status(200).send("true");  
    });

});

module.exports = uploadRouter;