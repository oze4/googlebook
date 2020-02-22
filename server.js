require('dotenv').config();

const express = require('express');
const path = require('path');
const Axios = require('axios');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

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

// *** REMOVED THIS ***
// const Book = mongoose.model('Book', bookSchema);

// ==========================================================
// **********************************************************
//          CHANGED THE WAY YOU CONNECT TO MONGO
// **********************************************************
// ==========================================================
/** */ mongoose.set('useCreateIndex', true);
/** */ 
/** */ const mongoConnection = mongoose.createConnection(mongoUri, {
/** */   useUnifiedTopology: true,
/** */   useNewUrlParser: true,
/** */   useFindAndModify: false,
/** */ });
/** */ 
/** */ const Book = mongoConnection.model('Book', bookSchema /*, 'COLLECTION_NAME'*/);
// ==========================================================
// **********************************************************
//                      END OF CHANGES
// **********************************************************
// ==========================================================

app.post('/api/search', (req, res) => {
  console.log('actually hit the route');
  Axios.get(
    `https://www.googleapis.com/books/v1/volumes?q=${req.body.term}`
  ).then(books => res.json(books.data.items));
});

app.post('/api/save', (req, res) => {
  const newBook = new Book({ info: req.body.book });
  newBook.save(err => {
    if (err) res.json(err);
    res.json({ status: true });
  });
});

app.post('/api/unsave', (req, res) => {
  Book.findByIdAndRemove(req.body.book._id, err => {
    if (err) res.json(err);
    res.json({ status: true });
  });
});

app.get('/api/saved', (req, res) => {
  Book.find({}, (err, books) => {
    if (err) res.json(err);
    else res.json(books);
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './client/build/index.html'));
});

/*
const db = mongoose.connection;

db.on('error', // console.error.bind(console, 'connection error:') 
  error => {
    console.log("[MONGOOSE][ERROR]", error);
  }
);

db.once('open', function() {
  console.log('[MONGOOSE][SUCCESS] Connected to database!');
});
*/

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
