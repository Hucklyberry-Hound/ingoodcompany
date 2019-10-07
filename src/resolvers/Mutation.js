/* eslint-disable no-return-await */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { APP_SECRET, getUserId } = require('../utils');

async function signup(parent, args, context, info) {
  const password = await bcrypt.hash(args.password, 10);
  const user = await context.prisma.createUser({ ...args, password });
  const token = jwt.sign({ userId: user.id }, APP_SECRET);
  return {
    token,
    user,
  };
}

async function login(parent, args, context, info) { // look into converting to try/catch
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

function createNewPost(parent, args, context, info) {
  const userId = getUserId(context);
  return context.prisma.createPost({
    url: args.url,
    description: args.description,
    postedBy: { connect: { id: userId } },
    community: { connect: { id: args.community } },
  });
}

function createNewCommunity(parent, args, context, info) {
  const userId = getUserId(context);
  return context.prisma.createCommunity({
    name: args.name,
    category: args.category,
    hasPosts: args.hasPosts,
    hasMessages: args.hasMessages,
    privacy: args.privacy,
    owner: { connect: { id: userId } },
  });
}

async function setCommunity(parent, args, context, info) { // try/catch
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
      communities: { connect: [{ id: communityId }] },
    },
    where: {
      id: userId,
    },
  });
}

module.exports = {
  signup,
  login,
  createNewPost,
  createNewCommunity,
  setCommunity,
};
