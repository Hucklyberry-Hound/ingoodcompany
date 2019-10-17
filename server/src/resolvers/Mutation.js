/* eslint-disable no-return-await */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { APP_SECRET, getUserId } = require('../utils');

const makeSlug = str => str.replace(/\s/g, '').toLowerCase();

//generate profile pix
const defaultImages = [
  'https://cdn3.iconfinder.com/data/icons/avatars-9/145/Avatar_Alien-512.png',
  'https://66.media.tumblr.com/15aa93b2b3b4949d6d061735c9ba6b21/tumblr_inline_n6y3qnRoSg1r73jj6.png',
  'https://cdn.dribbble.com/users/6142/screenshots/5679189/profiledefault_2x.png',
  'https://cdn.imgbin.com/0/10/15/imgbin-robot-scalable-graphics-euclidean-icon-robot-qDGV4CMnQsejEwaqGRvRiU1PH.jpg',
  'https://cdn.dribbble.com/users/2101624/screenshots/6068793/dribbble5.jpg',
  'https://i0.wp.com/aqyi.org/wp-content/uploads/2017/12/blank-profile.png?fit=449%2C449&ssl=1&w=640',
  'https://miro.medium.com/max/800/0*QCRunR_VjAIrvkjC.png',
  'https://icon-library.net/images/cool-profile-icon/cool-profile-icon-9.jpg',
];

async function signup(parent, args, context, info) {
  const randIdx = Math.floor(Math.random() * defaultImages.length - 1);
  const password = await bcrypt.hash(args.password, 10);
  let image = '';
  if (!args.image) {
    args.image = defaultImages[randIdx];
  }
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
    return {
      token: null,
      user: null,
    };
  }
  const valid = await bcrypt.compare(args.password, user.password);
  if (!valid) {
    return {
      token: null,
      user: null,
    };
  }
  const token = jwt.sign({ userId: user.id }, APP_SECRET);
  return {
    token,
    user,
  };
}

function createNewUser(
  parent,
  { firstName, lastName, email, username, password, image },
  context,
  info
) {
  return context.prisma.createUser({
    firstName,
    lastName,
    email,
    username,
    password,
    image,
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
    slug: slug,
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
    owner: { connect: { id: ownerId } },
  });
}

async function createNewComment(parent, { content, postId }, context, info) {
  const authorId = getUserId(context);
  const newComment = await context.prisma.createComment({
    content,
    author: { connect: { id: authorId } },
    post: { connect: { id: postId } },
  });

  return newComment;
}

async function addUserToCommunity(parent, args, context, info) {
  const { communityId } = args;
  const userId = getUserId(context);

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

async function deleteCommunity(parent, args, context, info) {
  // const userId = getUserId(context);

  const deletedCommunity = await context.prisma.deleteCommunity({
      id: args.communityId
  
  })

  return deletedCommunity
}

async function createEvent(parent, args, context, info) {
  const userId = getUserId(context);

  return context.prisma.createEvent({
    title: args.title,
    description: args.description,
    date: args.date,
    hostedby: { connect: { id: userId } },
    community: { connect: { id: args.community } },
  });
}

module.exports = {
  signup,
  login,
  createNewUser,
  createNewPost,
  createNewCommunity,
  createNewComment,
  addUserToCommunity,
  createEvent,
  deleteCommunity
};
