function feed(parent, args, context, info) {
  return context.prisma.posts();
}

module.exports = {
  feed,
};
