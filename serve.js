const express = require('express');
const path = require('path');
const ejs = require('ejs');
const fs = require('fs');
const app = express();

app.use(express.static(path.join(__dirname, './dist')));

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, './dist/index.html'));
});

app.listen(3000, function(err, res) {
    if (err) {
        console.log('err to serve vuejs-material-crud build', err);
    } else {
        console.log("vuejs-material-crud serve started");
    }
})
