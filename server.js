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
// app.use(express.static('public'));
// app.use('/:region', express.static('public'));

const getPathForRegion = (region, page) => {
  ALLOWED_REGIONS = ["au", "ng", "gb", "us"]

  const isRegion = ALLOWED_REGIONS.includes(region);
  const resolvedPage = page || "index"
  console.log(" page", page)
  console.log("resolved page", resolvedPage)
   console.log('isRegion',isRegion)

  const filePath = isRegion
    ? path.join(__dirname, "public", "regions", region, `${resolvedPage}.html`)
    : path.join(__dirname, "public", `${resolvedPage}.html`);

    console.log("file path", filePath)
    
  return filePath
}



const siteRouter = express.Router();

siteRouter.get("/", (_, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

siteRouter.get("/:region(au|us|gb|ng|eu)/:page?", (req, res, next) => {
  const { region, page} = req.params;
  
  res.sendFile(getPathForRegion(region, page));
});
siteRouter.get("/:region(au|us|gb|ng|eu)/", (req, res, next) => {
  const { region } = req.params;

  res.sendFile(getPathForRegion(region, page));
});

siteRouter.get("/:page", (req, res, next) => {
  const { page} = req.params;
  const region = null
 
  res.sendFile(getPathForRegion(region, page));
});







// siteRouter.get("/:region?/services", (req, res) => {
//   res.sendFile(getPathForRegion(region, "services"))
// });

// siteRouter.get("/:region?/contact", (req, res) => {
//     console.log("contact")
//   res.sendFile(getPathForRegion(region, "contact"))
// });

// siteRouter.get("/:region?/privacy", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "privacy.html"));
// });

// siteRouter.get("/:region?/terms", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "terms.html"));
// });

// siteRouter.get("/:region?/aml-policy", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "aml-policy.html"));
// });

// siteRouter.get("/:region?/sitemap.xml", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "sitemap.xml"));
// });

app.use(
  express.static(path.join(__dirname, "public"), {
    index: false, 
    extensions: ["js", "css", "svg", "png"]
  })
);
app.use("/:region", express.static(path.join(__dirname, "public"),
{
    index: false, 
    extensions: ["js", "css", "svg", "png"]
  }));


app.use("/", siteRouter);


// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
