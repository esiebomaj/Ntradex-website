const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (HTML, CSS, JS)
app.use(express.static('public'));

// route to serve about.html
app.get('/about', (_, res) => {
    res.sendFile(path.join(__dirname, 'public', 'about.html'));
});

app.get('/services', (_, res) => {
    res.sendFile(path.join(__dirname, 'public', 'services.html'));
});

// Route to serve contact.html
app.get('/contact', (_, res) => {
    res.sendFile(path.join(__dirname, 'public', 'contact.html'));
});

app.get('/privacy', (_, res) => {
    res.sendFile(path.join(__dirname, 'public', 'privacy.html'));
});

app.get('/terms', (_, res) => {
    res.sendFile(path.join(__dirname, 'public', 'terms.html'));
});

app.get('/aml-policy', (_, res) => {
    res.sendFile(path.join(__dirname, 'public', 'aml-policy.html'));
});

app.get('/sitemap.xml', (_, res) => {
    res.sendFile(path.join(__dirname, 'public', 'sitemap.xml'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
