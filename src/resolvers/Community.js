function owner(parent, args, context) {
  return context.prisma.community({ id: parent.id }).owner();
}

function posts(parent, args, context) {
  return context.prisma.community({ id: parent.id }).posts();
}

function users(parent, args, context) {
  return context.prisma.community({ id: parent.id }).users();
}

module.exports = {
  owner,
  posts,
  users,
};
