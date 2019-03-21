const express = require("express");
const router = express.Router();

const postDb = require("../data/helpers/postDb.js");

router.get("/", async (req, res) => {
  try {
    const posts = await postDb.get();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).send("Internal Error");
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const posts = await postDb.getById(2);
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).send("Internal Error");
  }
});

router.post("/", async (req, res) => {
  const post = req.body;
  try {
    const newPost = await postDb.insert(post);
    res.status(201).json(newPost);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Couldn't add post to database.  Try again later" });
  }
});

router.put("/:id", async (req, res) => {
  if (!req.body.text) {
    // If there is no text send error
    res.status(400).json({ error: "Please fill in the text" });
  }
  try {
    const newPost = await postDb.update(req.params.id, req.body);
    if (newPost === 1) {
      const updatedPost = await postDb.getById(req.params.id);
      res.status(200).json(updatedPost);
    } else {
      res.status(404).json({ error: "404 error: Post not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deleted = await postDb.remove(req.params.id);
    if (deleted === 1) {
      res.status(204).json({ message: "Post deleted successfully" });
    } else {
      res.status(404).json({ error: "404 error: Post not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
