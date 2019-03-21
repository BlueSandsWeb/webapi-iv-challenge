const express = require("express");
const server = express();
const helmet = require("helmet");

server.use(express.json());
server.use(helmet());

server.get("/", (req, res) => {
  res.send("try /api/users or /api/posts");
});

const postsRoutes = require("./routers/posts-router.js");
const usersRoutes = require("./routers/user-router.js");

server.use("/api/posts", postsRoutes);
server.use("/api/users", usersRoutes);

server.use((req, res) => {
  res
    .status(404)
    .send("Oops, there is no page here.  Please try a different URl");
});

module.exports = server;
