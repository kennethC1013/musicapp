import React, { useCallback, useState } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import music from '../../music';
import './App.css';

function App() {

  const [searchResults, setSearchResults] = useState([]);
  const [playlist, setPlaylist] = useState([]);
  const [playlistName, setPlaylistName] = useState('New Playlist');
  const [isNameConfirmed, setIsNameConfirmed] = useState(false);
  const [showPlaylist, setShowPlaylist] = useState(false)

  const updatedPlaylistName = useCallback((name) => {
    setPlaylistName(name)
    console.log('Playlist name updated to:', name)
  }, [])

  const confirmedPlaylistname = useCallback(() => {
    setIsNameConfirmed(true)
  }, [])

  const addTrackToPlaylist = (track) => {
    const trackExists = playlist.some(playlistTrack => playlistTrack.id === track.id);
    if (!trackExists) {
      setPlaylist(prevPlaylist => [...playlist, track])
    } else {
      alert('Track already in playlist')
    }
  }

  const removeTrackFromPlaylist = (track) => {
    const updatedPlaylist = playlist.filter(playlistTrack => playlistTrack.id !== track.id);
    setPlaylist(updatedPlaylist);
  }

  const search = useCallback((input) => {
    const results = music.search(input);
    const updatedResults = results.map(track => {
      const id = Number(track.id);
      return {
        ...track,
        id: id
    };
    });
    setSearchResults(updatedResults);
    setShowPlaylist(true)
}, []);

  const handleClick = () => {
    setSearchResults([]);
    setShowPlaylist(false)
  };

  let content;

  if (searchResults.length === 0) {
    content = <h1>This is the landing page!!</h1>;
  } else {
    content = (
      <SearchResults
        addTrackToPlaylist={addTrackToPlaylist}
        searchResults={searchResults}
      />
    )
  }

  return (
    <div className="App">
      <header>
        <button onClick={handleClick}>Home</button>
        <SearchBar
          onSearch={search}
        />
      </header>
      <div className='body'>
        {content}
      </div>
      {showPlaylist && (
        <Playlist
          onConfirmName={confirmedPlaylistname}
          isNameConfirmed={isNameConfirmed}
          playlistName={playlistName}
          onNameChange={updatedPlaylistName}
          playlistTracks={playlist}
          removeTrackFromPlaylist={removeTrackFromPlaylist}
        />
      )}
    </div>
  );
}

export default App;
