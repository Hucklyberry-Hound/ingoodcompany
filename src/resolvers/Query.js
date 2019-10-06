function feed(parent, args, context, info) {
    return context.prisma.post()
  }
  
  module.exports = {
    feed,
  }