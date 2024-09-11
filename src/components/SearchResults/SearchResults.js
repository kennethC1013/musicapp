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
        <div className='SearchResultsContainer'>
            <h1 className='results'>Results</h1>
            <div className='trackList'>
                {searchResults.length > 0 ? (
                    searchResults.map(track => {
                    
                        return (
                            <div className='searchResultsTracks'key={track.id}>
                                <Track track={track} />
                                <button className='addButton' onClick={() => handleClick(track)}>
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
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            artist: PropTypes.string.isRequired,
            album: PropTypes.string,
        })
    ).isRequired,
    addTrackToPlaylist: PropTypes.func.isRequired
};