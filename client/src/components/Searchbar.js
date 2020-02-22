import React from 'react'
import {DebounceInput} from 'react-debounce-input';

const Searchbar = ({/* search, */ setSearch}) => { // <-- No need for search param here
    return (
        <form action="#" method="get" className="searchbar" onSubmit={e => e.preventDefault()}>
            <DebounceInput
                minLength={2}
                debounceTimeout={300}
                type="search" 
                placeholder="🔎 search..."
                onChange={(e) => setSearch(e.target.value)}
            />
        </form>
    )
}

export default Searchbar;