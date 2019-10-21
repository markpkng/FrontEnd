import React from 'react';

const SearchForm = ({input, handleInput, handleSubmit}) => {
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <span>Search by location: </span>
                <input type='text' value={input} placeholder='Location' onChange={e => handleInput(e.target.value)}/>
                <button type='submit'>Submit</button>
            </form>
        </div>
    );
}

export default SearchForm;