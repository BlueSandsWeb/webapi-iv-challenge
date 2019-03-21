const server = require("./server.js");
require("dotenv").config();

const port = process.env.PORT || 5000;

server.listen(port, () => {
  console.log(`\n Server Running on http://localhost:${port}`);
});
