function owner(parent, args, context) {
  return context.prisma.community({ id: parent.id }).owner();
}

function posts(parent, args, context) {
  return context.prisma.community({ id: parent.id }).posts();
}

function users(parent, args, context) {
  return context.prisma.community({ id: parent.id }).users();
}

function events(parent, args, context) {
  return context.prisma.community({ id: parent.id }).events();
}

module.exports = {
  owner,
  posts,
  users,
  events,
};
