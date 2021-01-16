const { render } = require('ejs');
const express = require('express');
const mongoose = require('mongoose');
const bookRoutes = require('./routes/bookRoutes');
require('dotenv').config();//To transform .env to environment variables

const app = express();

//register view engine or tempalte engine
app.set('view engine', 'ejs'); // will look in the views folder by default
const dbname = process.env.DB_NAME;
const dbuser = process.env.DB_USER;
const dbpassword = process.env.DB_PASSWORD;
//connect to mongoDB
const db = `mongodb+srv://${dbuser}:${dbpassword}@nodetest.pbnnl.mongodb.net/${dbname}?retryWrites=true&w=majority`;
mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true})
.then((result) => {
    console.log('Connected to database');
    app.listen(3000, ()=> console.log(`Server it's up an running at http://localhost:3000`));
  })
  .catch((err) => console.error(err));

// middleware & static files
app.use(express.static('public')); // files inside public are visible to the user
// parse the url encoded data to work ith POST requests
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.redirect('books');
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'about'
  });
});

//Book routes
app.use('/books', bookRoutes);

//404
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});