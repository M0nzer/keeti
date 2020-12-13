//Setup Express
const express = require('express');
const app = express();
var cors = require('cors')
app.use(express.json());
app.use(cors())

//0923595393
//1234
//Setup Routers
const swRoute = require('./routers/selectWhere.router'),
      uqRoute = require('./routers/update.router'),
      isRoute = require('./routers/insert.router'),
      dqRoute = require('./routers/delete.router'),
      authRoute = require('./routers/auth.router');
//Routers
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