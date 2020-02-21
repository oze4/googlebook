import React, {useEffect, useState} from 'react';
import Axios from 'axios';
import BookCard from './BookCard';

const SavedList = () => {
    const [saved, setSaved] = useState([]);
    useEffect(() => {
        Axios.get('/api/saved')
        .then(res => setSaved(res.data))
    }, []);
    const list = saved.map(res => (
        <BookCard bookInfo={res} saved={true} />
    ))
    return (
        <div className="saved-list">
            {list}
        </div>
    )
}
export default SavedList;