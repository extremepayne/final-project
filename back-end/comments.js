const express = require("express");
const mongoose = require('mongoose');

const router = express.Router();

const users = require("./users.js");
const User = users.model;
const validUser = users.valid;

const commentSchema  = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User"
  },
  comment: String,
  created: {
    type: Date,
    default: Date.now
  },
});

const Comment = mongoose.model("Comment", commentSchema);

router.post("/", validUser, async (req, res) => {
  try {
    const comment = new Comment({
      user: req.user,
      comment: req.body.comment,
    });
    await comment.save();
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.get("/", async (req, res) => {
  try {
    let comments = await Comment.find().sort({
      created: -1
    }).populate("user");
    return res.send(comments);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

module.exports = {
  routes: router,
  model: Comment,
}
