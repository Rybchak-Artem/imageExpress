import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import express from 'express';

const app = express()
const port = 3000;
const favicon = readFileSync('C:\\Code\\faviconTrouble-main\\img\\black.jpg');
const imagePath = 'C:\\Code\\faviconTrouble-main\\img\\black.jpg';

app.get('/img/:width/:height', (req, res) => {
  const width = parseInt(req.params.width, 10);
  const height = parseInt(req.params.height, 10);

  console.log(`Received request for image with width: ${width} and height: ${height}`);

  if (isNaN(width) || isNaN(height) || width <= 0 || height <= 0) {
    return res.status(400).send('Invalid width or height');
  }

  res.setHeader('Content-Type', 'image/jpeg');

  sharp(imagePath)
    .resize(width, height, {
      fit: "cover",
      position: "center"
    })
    .jpeg({ quality: 80 })
    .pipe(res);
});

app.get('/', (req, res) => {
  res.redirect('/img/100/100');

});

// starts a simple http server locally on port 127.0.0.1:3000
app.listen(port, () => {
  console.log(`Example app listening on port 127.0.0.1:${port}`)
});
