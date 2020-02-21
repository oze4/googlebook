import React from 'react';
import SaveBook from '../utils/SaveBook';
import UnSaveBook from '../utils/UnSaveBook';
const BookCard = ({bookInfo, saved}) => {
    const book = bookInfo.info ? bookInfo.info.volumeInfo : bookInfo.volumeInfo;
    return (
        <div className="book-card">
            <div className="left">
                <img src={book.imageLinks ? book.imageLinks.smallThumbnail : null} alt=""/>
            </div>
            <div className="right">
                <div className="title">
                    <h2>{book.title}</h2>
                </div>
                <p className="authors">{book.authors ? book.authors[0] : null}</p>
                <div className="desc">
                <p>{book.description}</p>
                </div>
                <div className="actions">
                    <a href={book.infoLink}>More Info</a>
                    {saved ? (
                        <button className="save" onClick={() => UnSaveBook(bookInfo)}>Unsave</button>
                        ) : (
                        <button className="save" onClick={() => SaveBook(bookInfo)}>Save</button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default BookCard;