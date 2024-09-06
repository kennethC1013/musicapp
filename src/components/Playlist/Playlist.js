import React from "react";
import Track from "../Track/Track";
import './Playlist.css'
import PropTypes from 'prop-types';

export default function Playlist({ playlistTracks, removeTrackFromPlaylist }) {

    const handleClick = (track) => {
        removeTrackFromPlaylist(track);
}

    return (
        <div className="playlist">
            <h1>Playlist</h1>
            {playlistTracks.length > 0 ? (
                playlistTracks.map(track => (
                    <div key={track.id} className="tracks">
                        <Track track={track} />
                        <button onClick={() => handleClick(track)}>Remove</button>
                    </div>
                ))
            ) : (
                <p>No playlist</p>
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