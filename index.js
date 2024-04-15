const express = require("express");
const axios = require("axios");
const app = express();
const port = process.env.PORT || 3000;

const repoName = "TotoB12/oliver-images";

function getMimeType(url) {
  const extension = url.split('?')[0].split('.').pop();
  console.log(extension);
  const mimeTypes = {
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'png': 'image/png',
    'gif': 'image/gif',
    'bmp': 'image/bmp',
    'tiff': 'image/tiff',
    'webp': 'image/webp'
  };
  return mimeTypes[extension.toLowerCase()] || 'application/octet-stream';
}


app.get("/", async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.github.com/repos/${repoName}/contents/images/`,
      {
        headers: { Accept: "application/vnd.github.v3+json" },
      },
    );
    const files = response.data.filter((file) => file.type === "file");
    const randomFile = files[Math.floor(Math.random() * files.length)];

    const imageResponse = await axios.get(randomFile.download_url, {
      responseType: "arraybuffer",
    });

    const contentType = getMimeType(randomFile.name);

    res.set("Content-Type", contentType);
    res.send(imageResponse.data);
  } catch (error) {
    res.status(500).send("Error retrieving image");
  }
});

console.log(getMimeType("https://github.com/TotoB12/oliver-images/blob/main/images/P1040851.jpeg?raw=true"));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
