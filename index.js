const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// Connect MongoDB
mongoose.connect("mongodb+srv://bknithileshvar2009_db_user: nithileshvar*1@apex.ky5irtp.mongodb.net/apex?retryWrites=true&w=majority")
  .then(() => console.log("DB Connected"))
  .catch(err => console.log(err));

// User model
const User = mongoose.model("User", {
  email: String,
  password: String
});

// Post model
const Post = mongoose.model("Post", {
  userId: String,
  caption: String,
  imageUrl: String,
  createdAt: { type: Date, default: Date.now }
});

// Signup
app.post("/signup", async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.send("User Created");
});

// Login
app.post("/login", async (req, res) => {
  const user = await User.findOne(req.body);
  res.send(user ? "Login Success" : "Invalid");
});

// Create post
app.post("/post", async (req, res) => {
  const post = new Post(req.body);
  await post.save();
  res.send("Post Created");
});

// Get posts (feed)
app.get("/posts", async (req, res) => {
  const posts = await Post.find().sort({ createdAt: -1 });
  res.send(posts);
});

// Test
app.get("/", (req, res) => {
  res.send("Apex Backend Running 🚀");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running"));
