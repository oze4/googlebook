import Axios from "axios"

const SaveBook = (book) => {
    Axios.post('/api/save', {book})
    .then(res => res)
}

export default SaveBook;