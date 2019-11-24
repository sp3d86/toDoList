const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
         'Origin, X-Requested-With, Content-Type, Accept'
    );
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PATCH, DELETE, OPTIONS'
    );

    next();
});

app.post('/todos', (req, res, next) => {
    const todos = req.body;
    console.log(todos);
    res.status(201).json({
        todos
    });
});

app.get('/todos', (req, res, next) => {
    const todos = [
        {
            id: 0, 
            title: 'Restore fetching data', 
            complete: false
        },
        {
            id: 1, 
            title: 'Create header for auth', 
            complete: false
        },
        {
            id: 2, 
            title: 'init auth', 
            complete: false
        }
    ];

    return res.status(200).json({
      todos
    });
});

module.exports = app;