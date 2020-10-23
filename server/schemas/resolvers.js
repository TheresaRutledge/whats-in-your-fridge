const { AuthenticationError } = require("apollo-server-express");
const { User, Comment } = require("../models");
const { signToken } = require("../utils/auth");
const stripe = require("stripe")("sk_test_4eC39HqLyjWDarjtT1zdp7dc");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id);
        return user;
      }
      throw new AuthenticationError('Not logged in');
    },

    commentByRecipeId: async (parent, { recipeId }) => {
      const params = recipeId ? {recipeId} : {};
      return Comment.find(params).sort({ createdAt: -1 });
    },
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    //match authentication methods/names with teammeates...signToken
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Oops! Wrong Password");
      }

      const token = signToken(user);

      return { token, user };
    },

    addComment: async (parent, args, context) => {
      if (context.user) {
        const comment = await Comment.create({ ...args, username: context.user.username });
        return comment;
      }
    },

    updateComment: async (parent, { commentId }) => {
      const updatedComment = await Comment.findByIdAndUpdate(commentId);
      return updatedComment;
    },

    deleteComment: async (parent, { commentId }) => {
      return await Comment.findByIdAndDelete(commentId);
    },

    addFavorites: async (parent,{recipeId},context)=>{
      return await User.findByIdAndUpdate(
        {_id:context.user._id},
        {$push:{favorites:recipeId}},
        {new: true}
        )
    },
    removeFavorites: async (parent,{recipeId},context)=>{
      return await User.findByIdAndUpdate(
        {_id:context.user._id},
        {$pull:{favorites:recipeId}},
        {new: true}
        )
    },
  },
};

module.exports = resolvers;
