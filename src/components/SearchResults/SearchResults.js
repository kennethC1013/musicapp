import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import './SearchResults.css'
import Track from '../Track/Track.js'

export default function SearchResults({ searchResults = [], addTrackToPlaylist }) {

    console.log('Rendering SearchResults with searchResults:', searchResults)

    const handleClick = (track) => {
        addTrackToPlaylist(track)
    }

    useEffect(() => {
        console.log('Search results updated')
        searchResults.forEach(track => {
        });
    }, [searchResults])



    return (
        <div className='SearchResultsContainer'>
            <h1 className='results'>Results</h1>
            <div>
                {searchResults.length > 0 ? (
                    searchResults.map(track => {
                    
                        return (
                            <div key={track.id}>
                                <button className='addButton' onClick={() => handleClick(track)}>
                                    Add
                                </button>
                                <Track track={track} />
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
            album: PropTypes.string.isRequired,
        })
    ).isRequired,
    addTrackToPlaylist: PropTypes.func.isRequired
}