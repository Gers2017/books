const mongoose = require('mongoose');
const schema = mongoose.Schema;
const bookSchema = new schema({
  title: {
    type: String,
    required: true
  },
  author:{
    type: String,
    required: true
  },
  pages:{
    type: Number,
    required: true
  },
  price:{
    type: Number,
    required: true
  },
}, { timestamps: true });

const Book = mongoose.model('Books', bookSchema)
module.exports = Book;
