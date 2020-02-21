import Axios from "axios"

const SaveBook = (book) => {
    Axios.post('/save', {book})
    .then(res => res)
}

export default SaveBook;