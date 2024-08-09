const express = require('express');
const app = express();
const foo = require('./file.json'); // Use require for JSON files in CommonJS

console.log(app);

app.get('/', (req, res) => {
    res.send(foo    );
});

app.listen(8080, () => {
    console.log(foo);
});