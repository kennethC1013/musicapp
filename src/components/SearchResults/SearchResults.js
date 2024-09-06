import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import './SearchResults.css'
import Track from '../Track/Track.js'

export default function SearchResults({ searchResults = [], addTrackToPlaylist }) {

    const handleClick = (track) => {
        addTrackToPlaylist(track)
    }

    useEffect(() => {
        searchResults.forEach(track => {
        });
    }, [searchResults])

    return (
        <div className='SearchResults'>
            <h1>Results</h1>
            <div className='songContainer'>
                {searchResults.length > 0 ? (
                    searchResults.map(track => {
                    
                        return (
                            <div key={track.id}>
                                <Track track={track} />
                                <button className='add' onClick={() => handleClick(track)}>
                                    Add
                                </button>
                            </div>
                        );
                    })
                ) : (
                    <p>No results found</p>
                )}
            </div>
        </div>
    )
}

SearchResults.propTypes = {
    searchResults: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            artist: PropTypes.string.isRequired,
            album: PropTypes.string.isRequired,
        })
    ).isRequired,
    addTrackToPlaylist: PropTypes.func.isRequired
}