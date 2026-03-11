const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Static assets (CSS, JS, images, fonts, etc.) — served before any route logic
app.use(
  express.static(path.join(__dirname, 'public'), {
    index: false,
    extensions: ['js', 'css', 'svg', 'png', 'jpg', 'jpeg', 'ico', 'woff', 'woff2', 'ttf']
  })
);

const ALLOWED_REGIONS = ['au', 'ng', 'gb', 'us', 'ca', 'gh', 'ke', 'cn', 'sg', 'dk', 'de'];

// Named top-level pages
const PAGE_MAP = {
  'personal':    'personal.html',
  'business':    'business.html',
  'services':    'services.html',
  'about':       'about.html',
  'contact':     'contact.html',
  'privacy':     'privacy.html',
  'terms':       'terms.html',
  'aml-policy':  'aml-policy.html',
  'compliance':  'compliance.html',
  'sitemap.xml': 'sitemap.xml'
};

// Root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Named pages (/personal, /business, etc.) AND region index pages (/ng, /ca, etc.)
app.get('/:segment', (req, res, next) => {
  const seg = req.params.segment;

  if (PAGE_MAP[seg]) {
    return res.sendFile(path.join(__dirname, 'public', PAGE_MAP[seg]));
  }

  if (ALLOWED_REGIONS.includes(seg)) {
    return res.sendFile(path.join(__dirname, 'public', 'regions', seg, 'index.html'));
  }

  next();
});

// Region sub-pages (/ng/services, /ca/about, etc.)
app.get('/:region/:page', (req, res, next) => {
  const { region, page } = req.params;
  if (!ALLOWED_REGIONS.includes(region)) return next();
  const filePath = path.join(__dirname, 'public', 'regions', region, `${page}.html`);
  res.sendFile(filePath, err => { if (err) next(); });
});

// 404 fallback
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
