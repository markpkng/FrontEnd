import React from 'react';

const SearchForm = ({search, handleSearch}) => {
    return (
        <div>
            <span>Search by location: </span>
            <input type='text' value={search} placeholder='Location' onChange={e => handleSearch(e.target.value)}/>
        </div>
    );
}

export default SearchForm;