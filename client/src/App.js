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
  /**
   * Separated your state into 2 different variables.
   * Your request loop was happening due to how your 
   * useEffect was configured (specifically the dependency 
   * array)
   */
  const [searchTerm, setSearchTerm] = useState();
  const [searchResults, setSearchResults] = useState();

  /*
  const [search, setSearch] = useState({
    term: '',
    results: []
  });
  */

  useEffect(() => {
    Axios.post(`/api/search`, { term: searchTerm /* search.term */ })
    .then(books => {
      setSearchResults(books.data);
      // setSearch({...search, results: books.data})
    });
  }, [searchTerm]);

  return (
    <div className="app">
      <Header />
      <Router>
        <Route exact path='/'>
          <Searchbar /* search={search} <-- No need for this param */ setSearch={setSearchTerm} /> 
          {!searchTerm /* search.term */ ? (
            <div className="message">
              <p>Search for a book or whatever</p>
            </div>
          ) : <SearchList results={searchResults/* search.results */} />}
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
