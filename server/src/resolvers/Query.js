function posts(parent, args, context, info) {
  return context.prisma.posts();
}

function users(parent, args, context, info) {
  return context.prisma.users();
}

function communities(parent, args, context, info) {
  return context.prisma.communitys();
}

function comments(parent, args, context, info) {
  return context.prisma.comments();
}

module.exports = {
  posts,
  users,
  communities,
  comments,
};
