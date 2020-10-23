const { AuthenticationError } = require("apollo-server-express");
const { User, Comment } = require("../models");
const { signToken } = require("../utils/auth");
const stripe = require("stripe")("sk_test_4eC39HqLyjWDarjtT1zdp7dc");

const resolvers = {
  Query: {
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id);
        return user;
      }
    },

    comment: async (parent, args, context) => {
      if (context.Comment) {
        const comment = await Comment.findById(context.comment._id);
        return comment;
      }
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

    addComment: async (parent, args) => {
      const comment = await Comment.create(args);
      return comment;
    },

    updateComment: async (parent, {_id}) => {
        return await Comment.findByIdAndUpdate(_id);
    },

    deleteComment: async (parent, {_id}) => {
        return await Comment.findByIdAndDelete(_id);
    }
  },
};

module.exports = resolvers;
