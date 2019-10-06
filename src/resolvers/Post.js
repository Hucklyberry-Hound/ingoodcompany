function postedBy(parent, args, context) {
    return context.prisma.post({ id: parent.id }).postedBy()
  }

function community(parent, args, context) {
  return context.prisma.post({ id: parent.id }).community()
}
  
  module.exports = {
    postedBy,
    community
  }