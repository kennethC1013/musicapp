import React, { useCallback, useState} from 'react'
import PropTypes from 'prop-types'
import './SearchBar.css'

const SearchBar = ({onSearch}) => {
    const [input, setInput] = useState('');
    const [error, setError] = useState('')

    const handleInputChange = useCallback((event) => {
        setInput(event.target.value);
    }, [])

    const search = useCallback(() => {
        if (input.trim()) {
            onSearch(input);
            setError('');
        } else {
            setError('Please enter a valid input')
        }
    }, [onSearch, input])


    return (
        <div className="SearchBar">
            <input
                placeholder='Enter a song'
                type="text"
                value={input}
                onChange={handleInputChange}
            />
            <button
                className='SearchButton'
                onClick={search}
                disabled={!input.trim()}
            >
                Search
            </button>
            {error && <p className='error'>{error}</p>}
        </div>
    );
};

SearchBar.propTypes = {
    onSearch: PropTypes.func.isRequired
}

export default SearchBar