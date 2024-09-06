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
                <h2>{playlistName}</h2>
            ) : (
                <div>
                        <input
                            onChange={handleNameChange}
                            defaultValue={'New Playlist'}
                        />
                        <buton onClick={handleNameConfirm}>Confirm</buton>
                </div>
            )}
            {playlistTracks.length > 0 ? (
                playlistTracks.map(track => (
                    <div key={track.id} className="tracks">
                        <Track track={track} />
                        <button onClick={() => handleClick(track)}>Remove</button>
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
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            artist: PropTypes.string.isRequired,
            album: PropTypes.string.isRequired,
        })
    ).isRequired
}