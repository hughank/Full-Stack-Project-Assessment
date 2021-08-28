const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.listen(port, () => console.log(`Listening on port ${port}`));

// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
let videos = require('./exampleresponse.json');

// GET "/"
app.get("/", (req, res) => {
  res.send(videos);
});

app.post("/", (req, res) => {
  try {
    const body = req.body;

    const id = Date.now()
    body.id = id;

    videos.push(body);

    res.send({
      id
    });
  } catch (error) {
    res.status(500).send({
      "result": "failure",
      "message": "Video could not be saved"
    });
  }
});

app.get("/:id", (req, res) => {
  const { id } = req.params;
  const numericId = parseInt(id)

  const video = videos.find((video) => video.id === numericId)

  res.json({ video: video });
});

app.delete("/:id", (req, res) => {
  try {
    const { id } = req.params;
    const numericId = parseInt(id)
    if (!numericId) {
      throw new Error('Invalid id')
    }
    console.log(numericId)

    const updatedVideos = videos.filter((video) => video.id !== numericId)
    videos = updatedVideos

    res.send({});
  } catch (error) {
    res.status(500).json({
      "result": "failure",
      "message": "Video could not be deleted"
    });
  }
});




