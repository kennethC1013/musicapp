import './App.css';

import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import music from '../../music';
import React, { useCallback, useState } from 'react';

function App() {

  const [searchResults, setSearchResults] = useState([])

  const search = useCallback((input) => {
    const results = music.search(input);
    const updatedResults = results.map(track => ({
      ...track,
      id: Number(track.id)
    }));
    setSearchResults(updatedResults);
  }, [])
  
  const handleClick = () => {
    setSearchResults([])
  };

  return (
    <div className="App">
      <header>
        <button onClick={handleClick}>Home</button>
        <SearchBar onSearch={search} />
        </header>
      <div className='body'>
        {searchResults.length === 0 && <h1>This is the landing page!</h1>}
       {searchResults.length > 0 && <SearchResults searchResults={searchResults} />}
        </div>
    </div>
  );
}

export default App;
