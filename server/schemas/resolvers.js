const { AuthenticationError } = require('apollo-server-express');
const { User, Comment } = require('../models');
const { signToken } = require('../utils/auth');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');



const resolvers = {
    Query: {
        user: async (parent, args, context) => {
            if(context.user) {
                const user = await User.findById(context.user._id)
                return user;
            }
        },

        comment: async (parent, args, context) => {
            if(context.Comment) {
                const comment = await Comment.findById(context.comment._id)
                return comment;
            }
        }


    }
}

module.exports = resolvers;