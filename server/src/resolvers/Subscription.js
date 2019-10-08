function newPostsSubscribe(parent, args, context, info) {
    return context.prisma.$subscribe.post({ mutation_in: ['CREATED'] }).node()
  }
  
  const newPosts = {
    subscribe: newPostsSubscribe,
    resolve: payload => {
      return payload
    },
  }
  
  module.exports = {
    newPosts,
  }