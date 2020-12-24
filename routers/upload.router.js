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

uploadRouter.post('/upload', isAuth , (req , res)=>{
  let filePath = '';
  let type = '';
  let File = req.files.sampleFile;
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');

  }else if (req.query.path == 1){

    filePath = '../keeti/keeti/static/images/';
    type = 'images/';
    File.mv( filePath + File.name, function(err) {
      if (err)
        return res.status(500).send(err);
      else
        res.status(200).json({path : '/keeti/static/' + type + File.name});
    });

  } else if(req.query.path == 2){

    filePath = '../keeti/keeti/static/files/';
    type = 'files/';
    File.mv( filePath + File.name, function(err) {
      if (err)
        return res.status(500).send(err);
      else
        res.status(200).json({path : '/keeti/static/' + type + File.name});
    });

  }else if(req.query.path == 3){

    filePath = '../keeti/keeti/static/videos/';
    type = 'videos/';
    File.mv( filePath + File.name, function(err) {
      if (err)
        return res.status(500).send(err);
      else
        res.status(200).json({path : '/keeti/static/' + type + File.name});
    });

  } else {

    filePath = '../keeti/keeti/static/files/';
    type = 'files/';
    File.mv( filePath + File.name, function(err) {
      if (err)
        return res.status(500).send(err);
      else
        res.status(200).json({defult: `path query not equal 1 or 2 or 3 or even not avalable! your file saved at /keeti/static/${type}${File.name}`, help: '1 for image , 2 for file, 3 for video' , path : '/keeti/static/' + type + File.name});  
    });

  }

});

module.exports = uploadRouter;