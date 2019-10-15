/* eslint-disable no-return-await */
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { APP_SECRET, getUserId } = require("../utils");

const makeSlug = str => str.replace(/\s/g, "").toLowerCase();

async function signup(parent, args, context, info) {
  const password = await bcrypt.hash(args.password, 10);
  const user = await context.prisma.createUser({ ...args, password });
  const token = jwt.sign({ userId: user.id }, APP_SECRET);
  return {
    token,
    user
  };
}

async function login(parent, args, context, info) {
  const user = await context.prisma.user({ email: args.email });
  if (!user) {
    throw new Error("No such user found");
  }
  const valid = await bcrypt.compare(args.password, user.password);
  if (!valid) {
    throw new Error("Invalid password");
  }
  const token = jwt.sign({ userId: user.id }, APP_SECRET);
  return {
    token,
    user
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
    password
  });
}

function createNewPost(parent, args, context, info) {
  Id = getUserId(context);
  const slug = makeSlug(args.title);
  return context.prisma.createPost({
    title: args.title,
    content: args.content,
    postedBy: { connect: { id: Id } },
    community: { connect: { id: args.communityId } },
    slug: slug
  });
}

function createNewCommunity(
  parent,
  { name, category, hasPosts, hasMessages, hasEvents, privacy, about },
  context,
  info
) {
  const ownerId = getUserId(context);
  const slug = makeSlug(name);
  return context.prisma.createCommunity({
    name,
    category,
    hasPosts,
    hasEvents,
    hasMessages,
    privacy,
    slug,
    about,
    owner: { connect: { id: ownerId } }
  });
}

async function createNewComment(parent, { content, postId }, context, info) {
  const authorId = getUserId(context);
  const newComment = await context.prisma.createComment({
    content,
    author: { connect: { id: authorId } },
    post: { connect: { id: postId } }
  });

  return newComment;
}

async function addUserToCommunity(parent, args, context, info) {
  const { communityId } = args;
  const userId = getUserId(context);

  await context.prisma.updateCommunity({
    data: {
      users: { connect: [{ id: userId }] }
    },
    where: {
      id: communityId
    }
  });
  return await context.prisma.updateUser({
    data: {
      communities: { connect: [{ id: communityId }] } // connecting this way appends to the end of a list(n-m)
    },
    where: {
      id: userId
    }
  });
}

async function createEvent(parent, args, context, info) {
  const userId = getUserId(context);

  return context.prisma.createEvent({
    title: args.title,
    description: args.description,
    date: args.date,
    hostedby: { connect: { id: userId } },
    community: { connect: { id: args.community } },

  })

}

module.exports = {
  signup,
  login,
  createNewUser,
  createNewPost,
  createNewCommunity,
  createNewComment,
  addUserToCommunity,
  createEvent
};
