import React from 'react'
import PropTypes from 'prop-types'
import './SearchResults.css'

export default function SearchResults({ searchResults = []}) {

    return (
        <div className='SearchResults'>
            <h1>Results</h1>
            <div className='songContainer'>
                {SearchResults.length > 0? (
                    searchResults.map(track => (
                    <div key={track.id} className='songInfo'>
                        <h1 className='title'>{track.name}</h1>
                        <h2 className='artist'>{track.artist}</h2>
                        <h3 className='album'>{track.album}</h3>
                        <button className='actionButton'><p>+</p></button>
                        </div>
                    ))
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
    )
}