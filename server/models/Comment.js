const mongoose = require("mongoose");
const { Schema } = mongoose;
const User = require("./User");

const commentSchema = new Schema({
  // mongoose default creates an unique id?
  commentText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280,
  },

  recipeId: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
    get: (timeStamp) => moment(timeStamp).format("MMM DD, YYYY [at] hh:mm a"),
  },
  username: {
    type: String,
    required:true
  },
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;