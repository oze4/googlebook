import React, {useState, useEffect} from 'react';
import './App.scss';
import Header from './components/Header';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Searchbar from './components/Searchbar';
import Footer from './components/Footer';
import SearchList from './components/SearchList';
import Axios from 'axios';
import SavedList from './components/SavedList';

function App() {
  const [search, setSearch] = useState({
    term: '',
    results: []
  });
  useEffect(() => {
    Axios.post(`/api/search`,
      {
        term: search.term
      }
    )
    .then(books => setSearch({...search, results: books.data}));
  }, [search.term]);

  return (
    <div className="app">
      <Header />
      <Router>
        <Route exact path='/'>
          <Searchbar search={search} setSearch={setSearch} />
          {!search.term ? (
            <div className="message">
              <p>Search for a book or whatever</p>
            </div>
          ) : <SearchList results={search.results} />}
        </Route>
        <Route path='/saved'>
          <h2 className="title">Saved Books</h2>
          <SavedList />
        </Route>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
