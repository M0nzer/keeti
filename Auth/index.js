//Setup Express
// const express = require('express');
// const authRouter = express.Router();
// const db = require('../config/database');

//Setup bodyParser
// const bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
// authRouter.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
// authRouter.use(bodyParser.json());

// authRouter.get('/auth', (req, res) => {
// let response = {};
//     db.query(`select * from SET_users where phone = '${req.body.username}'`, (err, recordset)=>{
        
        
//         if (err){
//             res.status(500).json({
//                 error : true,
//                 message : err,
//                 data : []
//             });
//         } else if(recordset.length <= 0) {
//             res.status(500).json({
//                 error : true,
//                 message : 'No Data!',
//                 data : recordset
//             });
//         } else {
// response.userData = recordset;
//       db.cancel();
//             db.query(`select US.mySchoolID,S.id,S.nameEN,S.addressEN,S.dbServer,S.meetingServer,S.avatarURL,S.videoURL,S.audioURL,S.attachmentsURL,S.background from SET_schools S left outer join users_schools US on S.id = US.sID where US.uID = (select id from SET_users where phone = '${req.body.username}' and password ='${req.body.password}')` , (err, recordset)=>{
//                 if (err){
//                     res.status(500).json({
//                         error : true,
//                         message : err,
//                         data : []
//                     });
//                 } else {
// response.schoolData = recordset;
// db.cancel();
//                     res.status(200).json(response);
//                 }
            
        
//     });
//   }
// });
// });

// module.exports = authRouter;