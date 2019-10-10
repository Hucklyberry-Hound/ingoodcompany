/* eslint-disable no-shadow */
async function posts(parent, args, context, info) {
  const posts = await context.prisma.posts();
  return posts;
}

function users(parent, args, context, info) {
  return context.prisma.users();
}

function communities(parent, args, context, info) {
  return context.prisma.communities();
}

function comments(parent, args, context, info) {
  return context.prisma.comments();
}

// can make these getters more flexible by having them take optional id or name
// as long as they are at least getting 1 of those

function userByHandle(parent, args, context, info) {
  return context.prisma.user({ username: args.username });
}

function communityByName(parent, args, context, info) {
  return context.prisma.community({ name: args.name });
}

async function getPost(parent, { id }, context, info) {
  const post = await context.prisma.post({ id: id });
  return post;
}

async function getCommunity(parent, { slug }, context, info) {
  const community = await context.prisma.community({ slug });
  return community;
}

module.exports = {
  posts,
  users,
  communities,
  comments,
  userByHandle,
  communityByName,
  getPost,
  getCommunity,
};
