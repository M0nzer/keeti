//Setup Express
const express = require('express')
, cors = require('cors')
, app = express()
, morgan = require('morgan');

//setup cookieParser
const cookieParser = require('cookie-parser');
app.use(cookieParser());

//const path = require('path');
app.use(cors());

//handle Json
app.use(express.json());

app.use(morgan('tiny'));
//0923595393
//1234
//Setup Routers
const swRoute = require('./routers/selectWhere.router'),
      uqRoute = require('./routers/update.router'),
      isRoute = require('./routers/insert.router'),
      dqRoute = require('./routers/delete.router'),
      authRoute = require('./routers/auth.router'),
      uploadRoute = require('./routers/upload.router');
//Routers
//Note: You Can't Change the keeti In The url Because of The Directory In The Server (Windows Server); That's it Thanks
app.use('/keeti' , swRoute);
app.use('/keeti' , uqRoute);
app.use('/keeti' , isRoute);
app.use('/keeti' , dqRoute);
app.use('/keeti' , authRoute);
app.use('/keeti' , uploadRoute);

//Static Files
app.use('/keeti/static', express.static('./keeti/static'));


app.get('*', (req, res) => {

  res.status(404).json({error : 'Not Found!'});

});

app.post('*', (req, res) => {

    res.status(404).json({error : 'Not Found!'});

});

app.put('*', (req, res) => {

    res.status(404).json({error : 'Not Found!'});

});

app.delete('*', (req, res) => {

    res.status(404).json({error : 'Not Found!'});

});

//listening at 3000 OR process.env.PORT
app.listen(3000);

//http://localhost:3000/keeti/static/videos/VID-1608541833508.mp4