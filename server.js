const express = require('express');
const mongoose = require('mongoose');

const user = require('./routes/api/user');
const post = require('./routes/api/post');
const profile = require('./routes/api/profile');

const app = express();
//DB config
const db = require('./config/keys').mongoURI;

//Connect mongoDb using mongoose
mongoose
  .connect(db)
  .then(()=>console.log('connected'))
  .catch(err => console.log(err)); 

//Use routes
app.use('/api/user', user);
app.use('/api/profile', profile);
app.use('/api/post', post);

app.get('/', (req, res)=> res.send('Hello gaess'));

const port = process.env.PORT || 3000;

app.listen(port, ()=> console.log(`server is running in ${port}`));