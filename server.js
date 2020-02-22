const express = require('express');
const path = require('path');
const Axios = require('axios');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient

require('dotenv').config();

const PORT = process.env.PORT || 8080;
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/book';

const app = express();

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

const { Schema } = mongoose;
const bookSchema = new Schema({
  info: Schema.Types.Mixed,
});
const Book = mongoose.model('Book', bookSchema);

app.post('/api/search', (req, res) => {
  console.log('actually hit the route');
  Axios.get(
    `https://www.googleapis.com/books/v1/volumes?q=${req.body.term}`
  ).then(books => res.json(books.data.items));
});

app.post('/api/save', (req, res) => {
  console.log('got request');
  res.status(200).end();
  /*
  try {
    const newBook = new Book({ info: req.body.book });
    newBook.save(err => {
      if (err) res.json(err);
      res.json({ status: true });
    });
  } catch (err) {
    res.status(200).send({ error: err });
  }
  */
});

app.post('/api/unsave', (req, res) => {
  Book.findByIdAndRemove(req.body.book._id, err => {
    if (err) res.json(err);
    res.json({ status: true });
  });
});

app.get('/api/saved', (req, res) => {
  console.log("in /api/saved");
  try {
    Book.find({}, (err, books) => {
      if (err) res.json(err);
      res.json(books);
    });
  } catch (err) {
    res.status(200).send({ error: err });
  }
});

app.get('/api/test', (req, res) => {
  res.status(200).send("Got it!");
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './client/build/index.html'));
});

mongoose.connect(mongoUri, { 
  useNewUrlParser: true ,
  // useUnifiedTopology: true,  // Added to get rid of deprecation warnings
  // useFindAndModify: false    // Added to get rid of deprecation warnings
});

const db = mongoose.connection;

db.on('error', /* console.error.bind(console, 'connection error:') */ error => {
  console.log("[MONGOOSE][ERROR]", error);
});

db.once('open', function() {
  console.log('[MONGOOSE][SUCCESS] Connected to database!');
});

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
