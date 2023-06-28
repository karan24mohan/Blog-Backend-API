const express = require("express");
// require("./db/config");
const users = require("./db/user");
const blog = require("./db/blogs");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());
const port = 3100;

app.get("/", (req, resp) => {
  resp.send("Backend Deployed on Railway.app!");
});

app.get("/user", async (req, resp) => {
  let result = await users.find();
  const data = await result;
  resp.send(data);
});

app.post("/login", async (req, resp) => {
  let data = req.body;
  if (data) {
    let searchResult = await users.findOne(data);
    if (searchResult) {
      resp.send(`Login successfully ${searchResult}`);
    } else {
      resp.send("User not found");
    }
  } else {
    resp.send("User doesn't exist");
  }
});

app.post("/signup", async (req, resp) => {
  let data = req.body;
  let result = new users(data);
  result = await result.save();
  resp.send(result);
});

app.get("/blogs", async (req, resp) => {
  let result = await blog.find();
  resp.send(result);
});

app.post("/post", async (req, resp) => {
  let data = req.body;
  let result = new blog(data);
  result = await result.save();
  resp.send(`You have successfully posted the blog ${result}`);
});

app.listen(port);
