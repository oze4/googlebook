import Axios from "axios"

const UnSaveBook = (book) => {
    Axios.post('/unsave', {book})
    .then(res => res)
}

export default UnSaveBook;