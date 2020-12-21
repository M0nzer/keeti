const express = require('express')
, uploadRouter = express.Router()
, multer = require('multer')
, fs = require('fs')
, path = require('path');

//Multer Setup
const imgStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null,'./static/images/')
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
uploadRouter.post('/imgUpload' , imgUpload.single('image') , (req , res)=>{
  if(req.file){
      res.status(201).json({status: true , file: req.file , path: req.file.path});
  }else{
      res.sendStatus(403);
  }
});

uploadRouter.post('/fileUpload' , fileUpload.single('file') , (req , res)=>{
  if(req.file){
      res.status(201).json({status: true , file: req.file , path: req.file.path});
  }else{
      res.sendStatus(403);
  }
});

uploadRouter.post('/vidUpload', vidUpload.single('video') , (req , res)=>{
  if(req.file){
      res.status(201).json({status: true , file: req.file , path: req.file.path});
  }else{
      res.sendStatus(403);
  }
});
module.exports = uploadRouter;