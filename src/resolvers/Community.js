function owner(parent, args, context) {
    return context.prisma.community({ id: parent.id }).owner()
  }

  function posts(parent, args, context) {
      return context.prisma.community({ id: parent.id }).posts()
  }
  
  module.exports = {
    owner,
    posts
  }
