import Axios from "axios"

const UnSaveBook = (book) => {
    Axios.post('/api/unsave', {book})
    .then(res => res)
}

export default UnSaveBook;