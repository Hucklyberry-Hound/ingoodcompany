function newPostsSubscribe(parent, args, context, info) {
  return context.prisma.$subscribe.post({ mutation_in: ["CREATED"] }).node();
}

function newMemberSubscribe(parent, args, context, info) {
  return context.prisma.$subscribe.user({ mutation_in: ["CREATED"] }).node();
}

const newPosts = {
  subscribe: newPostsSubscribe,
  resolve: payload => {
    return payload;
  }
};

const newMember = {
  subscribe: newMemberSubscribe,
  resolve: payload => {
    return payload;
  }
};

module.exports = {
  newPosts,
  newMember
};
