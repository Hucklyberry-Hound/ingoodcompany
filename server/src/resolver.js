const uuid = require('uuid/v4');

module.exports = {
    Query: {
      currentUser: async (parent, args, context) =>  {
        console.log(context.getUser())
        return context.getUser() }
    },
    Mutation: {
      logout: (parent, args, context) => context.logout(),
      login: async (parent, { email, password }, context) => {
          const { user } = await context.authenticate('graphql-local', { email, password });
        
          console.log('CURRENT USER', context.getUser())
           context.login(user);
           console.log('REQ USER', context.req.user)


          return { user }
        },
        signup: async (parent, { firstName, lastName, email, password, username }, context) => {
            console.log('1 got here')
              const existingUsers = await context.prisma.users();
              const userWithEmailAlreadyExists = !!existingUsers.find(user => user.email === email);
        
              if (userWithEmailAlreadyExists) {
                throw new Error('User with email already exists');
              }
              const newUser = {
                firstName,
                lastName,
                email,
                password,
                username
              };
            
              console.log('2 got here')
              await context.prisma.createUser(newUser);
              context.login(newUser);
              
              return { user: newUser };
            }
 }

}

