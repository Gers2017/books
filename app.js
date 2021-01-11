const { render } = require('ejs');
const express = require('express');
const mongoose = require('mongoose');
const Book = require('./models/book');
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
    app.listen(3000);
    console.log('Connected to database');
  }) // listen to request when the db is running
  .catch((err) => console.error(err));

// middleware & static files
app.use(express.static('public')); // files inside public are visible to the user
// parse the url encoded data to work ith POST requests
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.redirect('books');
});

app.get('/about', (req, res) => {
  //res.sendFile(getView('about'));
  res.render('about', {
    title: 'about'
  });
});

app.get('/books', (req, res) => {
  Book.find()
  .then((result) => {
    res.render('books', {
      title: 'Books',
      books: result
    });
  })
  .catch((err) => {
    console.error(err);
  })
}); 


app.get('/books/create', (req, res) => {
  res.render('create', {
    title: 'create book'
  });
});


app.post('/books/create', (req, res) => {
  const book = new Book(req.body);
  book.save()//save to the db async
  .then((result) => {
    res.redirect('/books');
  })
  .catch((err) => {
    console.error(err);
  })
});


//:id to search the parameters
app.get('/books/:id', (req, res)=> {
  const id = req.params.id;
  Book.findById(id)
    .then((result) => {
      res.render('details', {
        title: 'Book details',
        book: result
      });
    })
    .catch(err => console.error(err));
});


app.delete('/books/:id', (req, res) => {
  const id = req.params.id;
  Book.findByIdAndDelete(id)
    .then(result => {
      res.json({ redirect: '/books' })
    })
    .catch(err => {
      console.error(err);
    });
});


//404
app.use((req, res) => { //if the above request doesn't match
  //res.status(404).res.sendFile(getView('404'));
  res.status(404).render('404', { title: '404' });
});

app.listen(3000, 'localhost', ()=>{
  console.log(`Server it's up an running at http://localhost:3000`);
});