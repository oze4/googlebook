import React from 'react';
import BookCard from './BookCard';

const SearchList = ({results}) => {
    const list = results.map(res => (
        <BookCard bookInfo={res} saved={false}/>
    ))
    return (
        <div className="search-list">
            {list}
        </div>
    )
}

export default SearchList;