const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());        // Avoid CORS errors in browsers
app.use(express.json()) // Populate req.body

const movies = [
    { id: 1, filmName: "Cizzbor", Actors: "Charlie Sheen", Rezizoor: "Michael Jackson" },
    { id: 2, filmName: "Cizzbor", Actors: "Sheen", Rezizoor: "Jackson" },
    { id: 3, filmName: "Cizzbor", Actors: "Charlie", Rezizoor: "Michael" },
]


app.get('/movies', (req, res) => {
    res.send(movies)
})



app.get('/movies/:id', (req, res) => {
    if (typeof movies[req.params.id - 1] === 'undefined') {
        return res.status(404).send({ error: "Widget not found" })
    }
    res.send(movies[req.params.id - 1])
})

app.post('/movies', (req, res) => {
    if (!req.body.filmName || !req.body.Actors || !req.body.Rezizoor) {
        return res.status(400).send({ error: 'One or all params are missing' })
    }
    let newMovie = {
        id: movies.length + 1,
        filmName: req.body.filmName,
        Actors: req.body.Actors,
        Rezizoor: req.body.Rezizoor
    }
    movies.push(newMovie)
    res.status(201).location('localhost:8080/movies/' + (movies.length - 1)).send(
        newMovie
    )
})

app.delete('/movies/:id', (req, res) => {
    if (typeof movies[req.params.id - 1] === 'undefined') {
        return res.status(404).send({ error: "movie not found" })
    }
    movies.splice(req.params.id -1,1)
    res.status(204).send({ error: "not deleted"})
})
app.listen(8080, () => {
    console.log(`API up at: http://localhost:8080`)
})
