const express = require('express');
const hbs = require('hbs');
var app = express();
const fs = require('fs');

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}:  ${req.method}  ${req.url}`;
    console.log(log);
    fs.appendFile('test.txt', log + '\n', (err) => {
        if (err) {
            console.log('error');
        }
    });
    next();
});

app.use((req, res, next) => {
    res.render('mant.hbs')
});

app.get('/', (req, res) => {
    // res.send('<h1>Hello express!</h1>');
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        year: new Date().getFullYear(),
        welcome: 'Welcome to website'
    });
});

app.get('/about', (req, res) => {
    // res.send('about page');
    res.render('about.hbs', {
        pageTitle: 'About Page',
        year: new Date().getFullYear()
    });
});

// app.get('/mant', (req, res) => {
//     // res.send('about page');
//     res.render('mant.hbs', {
//         pageTitle: 'Mant Page',
//         year: new Date().getFullYear()
//     });
// });

app.get('/bad', (req, res) => {
    res.send({
        error: 'Unable to connect'
    })
});

app.listen(3000, () => {
    console.log('server is up and running');
});