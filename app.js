require('dotenv').config()
const cors = require('cors')
const helmet = require('helmet');
const morgan = require('morgan');
const express = require('express');
const movies = require('./movieList.js');
const app = express();
app.use(morgan('dev'));
app.use(cors());
app.use(helmet());

app.use(function validateBearerToken(req, res, next){
    const bearerToken = req.get('Authorization').split(' ')[1]
    const apiToken = process.env.API_TOKEN
    if (!authToken || authToken.split(' ')[1] !== apiToken) {
        return res.status(401).json({ error: 'Unauthorized request' })
    }
    next()
})

app.get('/movie', (req, res) => {
    let response = movies;
    const { genre, country, avg_vote } = req.query;
     
    if (genre) {
        response = response.filter(movie => 
            movie.genre.toLowerCase().includes(genre.toLowerCase()))
    }
    if (country) {
        response = response.filter(movie => 
            movie.country.toLowerCase().includes(country.toLowerCase()))
    }
    if (avg_vote) {
        response = response.filter(movie => 
            parseInt(movie.avg_vote) >= parseInt(avg_vote))
    }
    
    res.json(response)
});

app.listen(8080, () => {
    console.log('Server started on PORT 8080');
});