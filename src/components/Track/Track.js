import React from "react";
import './Track.css';
import PropTypes from 'prop-types';

export default function Track({ track }) {

    return (
            <div className='songInfo'>
                <h1 className='title'>{track.name}</h1>
                <h2 className='artist'>{track.artist}</h2>
                <h3 className='album'>{track.album}</h3>
            </div>
    )
}

Track.propTypes = {
       track: PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            artist: PropTypes.string.isRequired,
           album: PropTypes.string.isRequired,
            uri: PropTypes.string
        }).isRequired
}