const express = require('express')
, uploadRouter = express.Router()
, multer = require('multer')
, fs = require('fs')
, path = require('path');

const isAuth = require('../middleware/auth').auth;

//bodyParser Setup
const bodyParser = require('body-parser');
uploadRouter.use(bodyParser.urlencoded({ extended: false }));
uploadRouter.use(bodyParser.json());

//setup cookieParser
const cookieParser = require('cookie-parser');
uploadRouter.use(cookieParser());

//Multer Setup
const imgStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null,'./static/images')
    },
    filename: (req, file, cb) => {
      cb(null,'IMG-' + Date.now() + path.extname(file.originalname))
    }
});

const imgUpload = multer({storage: imgStorage});

//Multer Setup
const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null,'./static/files/')
    },
    filename: (req, file, cb) => {
      cb(null,'FILE-' + Date.now() + path.extname(file.originalname))
    }
});

const fileUpload = multer({storage: fileStorage});

//Multer Setup
const vidStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null,'./static/videos/')
    },
    filename: (req, file, cb) => {
      cb(null,'VID-' + Date.now() + path.extname(file.originalname))
    }
});

const vidUpload = multer({storage: vidStorage});

//Router
uploadRouter.post('/imgUpload' , imgUpload.single('image') , isAuth , (req , res)=>{
  if(req.file){
    console.log(req.auth);
      res.status(201).json({status: true , file: req.file , path: req.file.path});
  }else{
      res.sendStatus(403);
  }
});

uploadRouter.post('/fileUpload' , fileUpload.single('file'), isAuth , (req , res)=>{
  if(req.file){
      res.status(201).json({status: true , file: req.file , path: req.file.path});
  }else{
      res.sendStatus(403);
  }
});

uploadRouter.post('/vidUpload', vidUpload.single('video'), isAuth , (req , res)=>{
  if(req.file){
      res.status(201).json({status: true , file: req.file , path: req.file.path});
  }else{
      res.sendStatus(403);
  }
});


module.exports = uploadRouter;