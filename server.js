const express = require('express');
const path = require('path');
const Axios = require('axios');
const mongoose = require('mongoose');
require('dotenv').config();

const PORT = process.env.PORT || 3001;
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/book';

const app = express();
const router = express.Router();
// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

const { Schema } = mongoose;
const bookSchema = new Schema({
  info: Schema.Types.Mixed,
});
const Book = mongoose.model('Book', bookSchema);

router.post('/api/search', (req, res) => {
  Axios.get(
    `https://www.googleapis.com/books/v1/volumes?q=${req.body.term}`
  ).then(books => res.json(books.data.items));
});
router.post('/api/save', (req, res) => {
  const newBook = new Book({ info: req.body.book });
  newBook.save(err => {
    if (err) res.json(err);
    res.json({ status: true });
  });
});
router.post('/api/unsave', (req, res) => {
  Book.findByIdAndRemove(req.body.book._id, err => {
    if (err) res.json(err);
    res.json({ status: true });
  });
});
router.get('/api/saved', (req, res) => {
  Book.find({}, (err, books) => {
    if (err) res.json(err);
    res.json(books);
  });
});
router.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './client/build/index.html'));
});

mongoose.connect(mongoUri, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connected');
});

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
