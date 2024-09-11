import React, { useCallback, useState } from "react";
import Track from "../Track/Track";
import './Playlist.css'
import PropTypes from 'prop-types';

export default function Playlist({ playlistTracks, removeTrackFromPlaylist, playlistName, onNameChange }) {

    const [isNameConfirmed, setIsNameConfirmed] = useState(false)

    const handleClick = (track) => {
        removeTrackFromPlaylist(track);
    }

    const handleNameChange = useCallback((event) => {
        onNameChange(event.target.value);
    }, [onNameChange])

    const handleNameConfirm = () => {
        if (playlistName.trim() !== '') {
       setIsNameConfirmed(true)
       }
   }

    return (
        <div className="playlist">
            {isNameConfirmed ? (
                <h2 className="playlistName">{playlistName}</h2>
            ) : (
                <div className="playlistInput">
                        <input
                            onChange={handleNameChange}
                            defaultValue={'New Playlist'}
                        />
                        <button className='inputButton' onClick={handleNameConfirm}>Confirm</button>
                </div>
            )}
            {playlistTracks.length > 0 ? (
                playlistTracks.map(track => (
                    <div key={track.id} className="playlistTracks">
                        <Track track={track} />
                        <button className='removeButton' onClick={() => handleClick(track)}>Remove</button>
                    </div>
                ))
            ) : (
                <p>No songs in playlist</p>
            )}
        </div>
    )

}

Playlist.propTypes = {
    playlistTracks: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            artist: PropTypes.string.isRequired,
            album: PropTypes.string,
        })
    ).isRequired,
    removeTrackFromPlaylist: PropTypes.func.isRequired,
    playlistName: PropTypes.string.isRequired,
    onNameChange: PropTypes.func.isRequired
}