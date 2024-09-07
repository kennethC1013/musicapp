import React, { useCallback, useState } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/spotify';
import './App.css';

function App() {

  const [searchResults, setSearchResults] = useState([]);
  const [playlist, setPlaylist] = useState([]);
  const [playlistName, setPlaylistName] = useState('New Playlist');
  const [isNameConfirmed, setIsNameConfirmed] = useState(false);
  const [showPlaylist, setShowPlaylist] = useState(false)

  const search = useCallback(async (input) => {
    const results = await Spotify.search(input);
    const updatedResults = results.map(track => ({
      ...track,
      id: track.id
    }));
    setSearchResults(updatedResults);
    setShowPlaylist(true)
  }, []);

  const updatedPlaylistName = useCallback((name) => {
    setPlaylistName(name)
    console.log('Playlist name updated to:', name)
  }, [])

  const confirmedPlaylistname = useCallback(() => {
    setIsNameConfirmed(true)
  }, [])

  const addTrackToPlaylist = (track) => {
    console.log('Attempting to add track', track);

    const trackExists = playlist.some(playlistTrack => playlistTrack.id === track.id);
    console.log('Track exists in playlist', trackExists)

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

  const handleClick = () => {
    setSearchResults([]);
    setShowPlaylist(false)
  };

  const savePlaylist = () => {
    localStorage.setItem('savedPlaylist', JSON.stringify(playlist));
    alert('Playlist saved!');
  }

  const loadSavedPlaylist = () => {
    const savedPlaylist = localStorage.getItem('savedPlaylist');
    if (savedPlaylist) {
      setPlaylist(JSON.parse(savedPlaylist));
    } else {
      alert('No saved playlist found.')
    }
  }

  let content;

  if (searchResults.length === 0) {
    content = <div className='landingPage'><h1>Welcome!</h1></div>;
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
        <button className='clickButton' onClick={handleClick}>Home</button>
        <SearchBar onSearch={search} />
        <button className='clickButton' onClick={savePlaylist}>Save Playlist</button>
        <button className='clickButton' onClick={loadSavedPlaylist}>Load Playlist</button>
      </header>
      <div className='body'>
        {content}
      </div>
      <div className='playlistContainer'>
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
    </div>
  );
}

export default App;
