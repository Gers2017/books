const Book = require('../models/book');

const bookIndex = (req, res) => {
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
}

const bookCreateGet = (req, res) => {
  res.render('create', {
    title: 'create book'
  });
}

const bookCreatePost = (req, res) => {
  const book = new Book(req.body);
  book.save()//save to the db async
  .then((result) => {
    res.redirect('/books');
  })
  .catch((err) => {
    console.error(err);
  })
}

const bookById = (req, res) => {
  const id = req.params.id;
  Book.findById(id)
    .then((result) => {
      res.render('details', {
        title: 'Book details',
        book: result
      });
    })
    .catch((err) => {
      res.status(404).render('404', { title: '404' });
    });
}

const bookDelete = (req, res) => {
  const id = req.params.id;
  Book.findByIdAndDelete(id)
    .then(result => {
      res.json({ redirect: '/books' })
    })
    .catch(err => {
      console.error(err);
    });
}

module.exports = {
  bookIndex,
  bookCreateGet,
  bookCreatePost,
  bookById,
  bookDelete
}