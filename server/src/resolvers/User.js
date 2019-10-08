function posts(parent, args, context) {
  return context.prisma.user({ id: parent.id }).posts();
}

function communities(parent, args, context) {
  return context.prisma.user({ id: parent.id }).communities();
}

module.exports = {
  posts,
  communities,
};
