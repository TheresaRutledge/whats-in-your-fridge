const faker = require('faker');

const db = require('../config/connection');
const { User, Comment } = require('../models');

db.once('open', async () => {
  // clean up current mongoDB db
  await User.deletMany({});
  await Comment.deleteMany({});
  //--------------user data-------------------//
  // set empty array to store userData
  const userData = [];
  for (let i = 0; i < 20; i += 1) {
    // declare keys
    const username = faker.internet.userName();
    const email = faker.internet.email(username);
    const password = faker.internet.password();
    const favorites = [faker.lorem.words(Math.round(Math.random() * 8) + 1)];
    // push into userData array
    userData.push({ username, email, password,favorites });
  }
  const createdUsers = await User.collection.insertMany(userData);
  //--------------comment data-------------------//
  // set empty array to store comments
  let createdComments = [];
  for (let i = 0; i < 40; i += 1) {
    // declare keys
    // define commentText, each commentText can have maximum 20 words
    const commentText = faker.lorem.words(Math.round(Math.random() * 20) + 1);
    // define username, link to user with _id:userId
    const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
    const { username, _id: userId } = createdUsers.ops[randomUserIndex];
    // declare object createdComment
    const createdComment = await Comment.create({ commentText, username });
    // push createdComment to User collection
    const updatedUser = await User.updateOne(
      { _id: userId },
      { $push: { comments: createdComment._id } },
    );
    // push created Comment to createdComments array
    createdComments.push(createdComment);
  }
  
  // log after finish
  console.log('seeding all done!');
  process.exit(0);
});
