const express = require('express');
const app = express();
const movies = require('./movieList.js');

app.get('/movie', (req, res) => {
    let response = movies;
    const { genre, country, avg_vote } = req.query;
        res.json(response)
});

app.listen(8080, () => {
    console.log('Server started on PORT 8080');
});