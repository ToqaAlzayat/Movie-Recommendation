const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config(); // To load environment variables from .env

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); // Enable CORS for cross-origin requests
app.use(express.json()); // To parse JSON request bodies

const apiKey = process.env.MOVIE_API_KEY; // Store your API key in .env
// Example API Route to handle movie search
app.get('/api/search', async (req, res) => {

    const searchQuery = req.query.s;
    if (!searchQuery) {

        return res.status(400).json({ error: 'Search query is required' });
    }

    try {
      
        const response = await axios.get(`http://www.omdbapi.com/`, {
            params: {
                s: searchQuery,
                type: 'movie',
                apikey: apiKey,
                page: req.query.page,
            },
        });

        if (response.data.Response === 'True') {
            res.json(response.data);

        } else {
            res.status(404).json({ message: 'No results found' });
        }
    } catch (error) {
        console.error('Error fetching data:', error.message);
        res.status(500).json({ error: 'Server error' });
    }
});
// Route to get movies based on genre
app.get('/api/movies', async (req, res) => {
    const { genre } = req.query; // Get the genre from the query string
    const url = `http://www.omdbapi.com/?apikey=${apiKey}&s=${genre}&type=movie&page=1`;

    try {
        const response = await axios.get(url);
        if (response.data.Response === 'True') {
            const movies = response.data.Search;
            res.json(movies);
        } else {
            res.status(404).json({ error: 'No movies found for the given genre' });
        }
    } catch (error) {
        console.error('Error fetching movies:', error);
        res.status(500).json({ error: 'Error fetching movies from OMDB' });
    }
});
// API Route to fetch movie details by ID
app.get('/api/movie/:id', async (req, res) => {
    const movieId = req.params.id;

    try {
        
        const response = await axios.get(`http://www.omdbapi.com/`, {
            params: {
                i: movieId,
                apikey: apiKey,
            },
        });

        if (response.data.Response === 'True') {
            res.json(response.data);
        } else {
            res.status(404).json({ message: 'Movie not found' });
        }
    } catch (error) {
        console.error('Error fetching movie details:', error.message);
        res.status(500).json({ error: 'Server error' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
