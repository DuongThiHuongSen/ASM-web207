const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('It works');
})

const server = app.listen(3000, () => {
    console.log(`The application started on port ${server.address().port}`);
});