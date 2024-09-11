import React from "react";
import './Track.css';
import PropTypes from 'prop-types';

export default function Track({ track }) {

    return (
            <div className='track'>
            <h1 className='title'>{track.name}</h1>
            <div className='songInfo'>
                <p className='artist'>{track.artist}</p>
                <p className='album'>{track.album}</p>
                </div>
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