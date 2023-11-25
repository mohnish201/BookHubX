const { default: axios } = require("axios");

function getSuggestedBooks(authorName, bookTitle){
    
    axios.get(`http://localhost:4800/books?q=${authorName}`)
}