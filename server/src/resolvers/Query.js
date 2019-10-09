function posts(parent, args, context, info) {
  return context.prisma.posts();
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

function userByHandle(parent, args, context, info) {
  return context.prisma.user({ username: args.username });
}

function communityByName(parent, args, context, info) {
  return context.prisma.community({ name: args.name });
}

module.exports = {
  posts,
  users,
  communities,
  comments,
  userByHandle,
  communityByName
};
