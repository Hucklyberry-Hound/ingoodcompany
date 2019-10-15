function author(parent, args, context) {
  return context.prisma.comment({ id: parent.id }).author();
}

function post(parent, args, context) {
  return context.prisma.comment({ id: parent.id }).post();
}



module.exports = {
  author,
  post
};
