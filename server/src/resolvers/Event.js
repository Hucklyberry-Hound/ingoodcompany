function hostedby(parent, args, context) {
    return context.prisma.event({ id: parent.id }).hostedby();
  }
  
  function community(parent, args, context) {
    return context.prisma.event({ id: parent.id }).community();
  }

  module.exports = {
    hostedby,
    community
  };
  