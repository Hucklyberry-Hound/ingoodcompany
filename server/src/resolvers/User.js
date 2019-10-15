function posts(parent, args, context) {
  return context.prisma.user({ id: parent.id }).posts();
}

function communities(parent, args, context) {
  return context.prisma.user({ id: parent.id }).communities();
}

function ownerOf(parent, args, context) {
  return context.prisma.user({ id: parent.id }).ownerOf();
}

function comments(parent, args, context) {
  return context.prisma.user({ id: parent.id }).comments();
}

function comments(parent, args, context) {
  return context.prisma.user({ id: parent.id }).comments();
}

function events(parent, args, context) {
  return context.prisma.user({ id: parent.id }).events();
}


module.exports = {
  posts,
  communities,
  ownerOf,
  comments,
  events
};
