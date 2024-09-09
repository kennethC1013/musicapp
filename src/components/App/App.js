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
  const [showPlaylist, setShowPlaylist] = useState(false);

  const search = useCallback(async (input) => {
    try {
      const results = await Spotify.search(input);
      if (results.length > 0) {

        const updatedResults = results.map(track => ({
          ...track,
          id: track.id
        }));

        setSearchResults(prevResults => {
          if (JSON.stringify(prevResults) !== JSON.stringify(updatedResults)) {
            return updatedResults;
          }
          return prevResults;
        });
        setShowPlaylist(true);
      } else {
        setSearchResults([]);
        setShowPlaylist(false)
      }
    } catch (error) {
      console.error('Error during search:', error)
    }
  }, []);

  const updatedPlaylistName = useCallback((name) => {
    setPlaylistName(name)
    console.log('Playlist name updated to:', name)
  }, [])

  const confirmedPlaylistname = useCallback(() => {
    setIsNameConfirmed(true)
  }, [])

  const addTrackToPlaylist = useCallback((track) => {
    console.log('Attempting to add track', track);
    const trackExists = playlist.some(playlistTrack => playlistTrack.id === track.id);
    console.log('Track exists in playlist', trackExists)
    if (!trackExists) {
      setPlaylist(prevPlaylist => [...playlist, track])
    } else {
      alert('Track already in playlist')
    }
  }, [playlist])

  const removeTrackFromPlaylist = (track) => {
    const updatedPlaylist = playlist.filter(playlistTrack => playlistTrack.id !== track.id);
    setPlaylist(updatedPlaylist);
  }

  const handleClick = () => {
    setSearchResults([]);
    setShowPlaylist(false)
  };

  const savePlaylist = useCallback(() => {
    const trackUris = playlist.map((track) => track.uri);
    Spotify.savePlaylist(playlistName, trackUris).then(() => {
      setPlaylist([])
    });
  }, [playlistName, playlist])

  let content;

  if (searchResults.length === 0) {
    content = <div className='landingPage'>
      <h1>Welcome!</h1>
      <p>Welcome to MusicApp, your ultimate destination for discovering and managing your favorite tunes. With MusicApp, you can effortlessly search for tracks, create custom playlists, and stay on top of your favorite artists. Dive into a personalized music experience and let the rhythm guide you!</p>
    </div>;
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
        {searchResults.length > 0 && (
        <button className='clickButton' onClick={savePlaylist}>Save Playlist</button>
      )}
        <SearchBar onSearch={search} />
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
