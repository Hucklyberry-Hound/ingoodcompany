function postedBy(parent, args, context) {
    return context.prisma.post({ id: parent.id }).postedBy()
  }
  
  module.exports = {
    postedBy,
  }