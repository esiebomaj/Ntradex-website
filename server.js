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
// app.use((req, res, next) => {
  
//   //  if (req.path.startsWith('/au')) { 
   
//   //   return res.redirect('/'); 
//   //  }

//   console.log('path', req.path)
//   next()
// });

// Serve static files (HTML, CSS, JS)
// app.use(express.static('public'));
// app.use('/:region', express.static('public'));



const siteRouter = express.Router();

siteRouter.get("/", (_, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

siteRouter.get("/about", (_, res) => {
  res.sendFile(path.join(__dirname, "public", "about.html"));
});

siteRouter.get("/services", (_, res) => {
  res.sendFile(path.join(__dirname, "public", "services.html"));
});

siteRouter.get("/contact", (_, res) => {
    console.log("contact")
  res.sendFile(path.join(__dirname, "public", "contact.html"));
});

siteRouter.get("/privacy", (_, res) => {
  res.sendFile(path.join(__dirname, "public", "privacy.html"));
});

siteRouter.get("/terms", (_, res) => {
  res.sendFile(path.join(__dirname, "public", "terms.html"));
});

siteRouter.get("/aml-policy", (_, res) => {
  res.sendFile(path.join(__dirname, "public", "aml-policy.html"));
});

siteRouter.get("/sitemap.xml", (_, res) => {
  res.sendFile(path.join(__dirname, "public", "sitemap.xml"));
});

// router for both root and region-prefixed paths
app.use("/", siteRouter);
app.use("/:region", siteRouter);


app.use(express.static(path.join(__dirname, "public")));
app.use("/:region", express.static(path.join(__dirname, "public")));

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
