/* eslint-disable no-return-await */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { APP_SECRET, getUserId } = require('../utils');

const makeSlug = str => str.replace(/\s/g, '').toLowerCase();

async function signup(parent, args, context, info) {
  const password = await bcrypt.hash(args.password, 10);
  const user = await context.prisma.createUser({ ...args, password });
  const token = jwt.sign({ userId: user.id }, APP_SECRET);
  return {
    token,
    user,
  };
}

async function login(parent, args, context, info) {
  const user = await context.prisma.user({ email: args.email });
  if (!user) {
    throw new Error('No such user found');
  }
  const valid = await bcrypt.compare(args.password, user.password);
  if (!valid) {
    throw new Error('Invalid password');
  }
  const token = jwt.sign({ userId: user.id }, APP_SECRET);
  return {
    token,
    user,
  };
}

function createNewUser(
  parent,
  { firstName, lastName, email, username, password },
  context,
  info
) {
  return context.prisma.createUser({
    firstName,
    lastName,
    email,
    username,
    password,
  });
}

function createNewPost(
  parent,
  { userId, communityId, title, content },
  context,
  info
) {
  const slug = makeSlug(title);
  return context.prisma.createPost({
    title,
    slug,
    content,
    postedBy: { connect: { id: userId } },
    community: { connect: { id: communityId } },
  });
}

function createNewCommunity(
  parent,
  { ownerId, name, category, hasPosts, hasMessages, privacy },
  context,
  info
) {
  if (!ownerId) {
    const ownerId = getUserId(context);
  }
  const slug = makeSlug(name);
  return context.prisma.createCommunity({
    name,
    category,
    hasPosts,
    hasMessages,
    privacy,
    slug,
    owner: { connect: { id: ownerId } },
  });
}

function createNewComment(parent, args, context, info) {
  return context.prisma.createComment({
    content: args.content,
    author: { connect: { id: args.authorId } },
    post: { connect: { id: args.postId } },
  });
}

async function setCommunity(parent, args, context, info) {
  const { userId, communityId } = args;
  await context.prisma.updateCommunity({
    data: {
      users: { connect: [{ id: userId }] },
    },
    where: {
      id: communityId,
    },
  });
  return await context.prisma.updateUser({
    data: {
      communities: { connect: [{ id: communityId }] }, // connecting this way appends to the end of a list(n-m)
    },
    where: {
      id: userId,
    },
  });
}

module.exports = {
  signup,
  login,
  createNewUser,
  createNewPost,
  createNewCommunity,
  createNewComment,
  setCommunity,
};
