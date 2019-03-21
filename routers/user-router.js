const express = require("express");
const router = express.Router();

const userDb = require("../data/helpers/userDb.js");

function upperCase(req, res, next) {
  req.body.name = req.body.name.toUpperCase();
  next();
}

router.get("/", async (req, res) => {
  try {
    const users = await userDb.get();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).send("Internal Error");
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const users = await userDb.getById(id);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).send("Internal Error");
  }
});

router.get("/posts-by-user/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const posts = await userDb.getUserPosts(id);
    if (posts.length > 0) {
      res.status(200).json(posts);
    } else {
      res.status(404).json({
        message:
          "Sorry, no posts to display! There is either no user or they don't have any posts yet."
      });
    }
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
});

router.post("/", upperCase, async (req, res) => {
  const post = req.body;
  try {
    const newUser = await userDb.insert(post);
    res.status(201).json(newUser);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Couldn't add user to database.  Try again" });
  }
});

router.put("/:id", upperCase, async (req, res) => {
  try {
    const newUser = await userDb.update(req.params.id, req.body);
    if (newUser === 1) {
      const updatedUser = await userDb.getById(req.params.id);
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ error: "404 error: User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deleted = await userDb.remove(req.params.id);
    if (deleted === 1) {
      res.status(204).json({ message: "User deleted successfully" });
    } else {
      res.status(404).json({ error: "404 error: User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
