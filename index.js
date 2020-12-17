//Setup Express
const express = require('express');
const cors = require('cors');
app.use(cors());
const app = express();
//handle Json
app.use(express.json());

//0923595393
//1234
//Setup Routers
const swRoute = require('./routers/selectWhere.router'),
      uqRoute = require('./routers/update.router'),
      isRoute = require('./routers/insert.router'),
      dqRoute = require('./routers/delete.router'),
      authRoute = require('./routers/auth.router');
//Routers
//Note: You Can't Change the keeti In The url Because of The Directory In The Server (Windows Server); That's it Thanks
app.use('/keeti' , swRoute);
app.use('/keeti' , uqRoute);
app.use('/keeti' , isRoute);
app.use('/keeti' , dqRoute);
app.use('/keeti' , authRoute);

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

//listening at 3000
app.listen(3000);