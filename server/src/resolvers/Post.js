function postedBy(parent, args, context) {
  return context.prisma.post({ id: parent.id }).postedBy();
}

function community(parent, args, context) {
  return context.prisma.post({ id: parent.id }).community();
}

async function comments(parent, args, context) {
  const comments = await context.prisma.post({ id: parent.id }).comments();
  return comments;
}

module.exports = {
  postedBy,
  community,
  comments
};
