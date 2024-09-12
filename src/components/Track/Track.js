import React from "react";
import './Track.css';
import PropTypes from 'prop-types';

export default function Track({ track }) {

    return (
        <div className='track'>
            <img src={track.albumCover} alt={track.album} className="albumCover" />
            <p className='title'>{track.name}</p>
                <p className='artist'>{track.artist}</p>
                <p className='album'>{track.album}</p>
                </div>
    )
}

Track.propTypes = {
       track: PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            artist: PropTypes.string.isRequired,
           album: PropTypes.string,
            uri: PropTypes.string
        }).isRequired
}