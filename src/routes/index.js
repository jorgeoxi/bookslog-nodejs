const { Router } = require('express');
const router = Router();
const fs = require('fs'); // Módulo para leer archivos como por ejemplos JSON
const uuid = require('uuid/v4');

const json_books = fs.readFileSync('src/books.json', 'utf-8');
let books = JSON.parse(json_books);

router.get('/', (req, res) => {
    res.render('index.ejs', {
        books
    });
})

router.get('/new-entry', (req, res) => {
    res.render('new-entry');
})

router.post('/new-entry', (req, res) => {
    const { title, author, image, description } = req.body;
    if (!title || !author || !image || !description) {
        res.status(400).send('Must complete all the entries, please');
        return;
    }

    let newBook = {
        id: uuid(),
        title,
        author,
        image, 
        description
    };

    books.push(newBook);

    const json_books = JSON.stringify(books) // Metodo que convierte el arreglo en un string
    fs.writeFileSync('src/books.json', json_books, 'utf-8');

    res.redirect('/');
})

router.get('/delete/:id', (req, res) => {
    books = books.filter(book => book.id != req.params.id);
    const json_books = JSON.stringify(books) // Metodo que convierte el arreglo en un string
    fs.writeFileSync('src/books.json', json_books, 'utf-8');
    res.redirect('/');
});

module.exports = router;