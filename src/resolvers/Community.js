function owner(parent, args, context) {
    return context.prisma.community({ id: parent.id }).owner()
  }
  
  module.exports = {
    owner
  }
  