const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;

const repoName = 'TotoB12/oliver-images';

app.get('/', async (req, res) => {
  try {
    const response = await axios.get(`https://api.github.com/repos/${repoName}/contents/images/`);
    const files = response.data.filter(file => file.type === 'file');
    const randomFile = files[Math.floor(Math.random() * files.length)];
    res.redirect(randomFile.download_url);
  } catch (error) {
    res.status(500).send('Error retrieving images');
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
