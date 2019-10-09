const { GraphQLServer } = require('graphql-yoga')
const { prisma } = require('./generated/prisma-client')
const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const User = require('./resolvers/User')
const Post = require('./resolvers/Post')
const Subscription = require('./resolvers/Subscription')
const Community = require('./resolvers/Community')



// const resolvers = {
//     Query,
//     Mutation,
//     Subscription,
//     User,
//     Post,
//     Community
//   }

// const server = new GraphQLServer({
//     typeDefs: 'server/src/schema.graphql',
//     resolvers,
//     context: request => {
//       return {
//         ...request,
//         prisma,
//       }
//     },
//   })

//   const options = {
//     port: 4000,
//     endpoint: '/graphql'
//     }

// server.start(options, ({port}) => console.log(`Server is running on http://localhost:${port}`))


const express = require('express')
const SESSION_SECRECT = 'bad secret';
const session = require('express-session');
const uuid = require('uuid/v4');
const passport = require('passport');
const PORT = 4000;
const { ApolloServer } = require('apollo-server-express');
const resolvers = require('./resolver')
const typeDefs = require('./typeDefs')
const { GraphQLLocalStrategy, buildContext } = require('graphql-passport')



const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => buildContext({ 
    req: req, 
    prisma,
    res: res
  }),

});

passport.use(
  new GraphQLLocalStrategy(async (email, password, done) => {
    const users = await prisma.users();
    const matchingUser = users.find(user => email === user.email && password === user.password);
    const error = matchingUser ? null : new Error('no matching user');
    done(error, matchingUser);
  }),
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const users = await prisma.users();
  const matchingUser = users.find(user => user.id === id);
  // const matchingUser = await prisma.users({id})
  console.log('HEEEEEERRRRRRRRRREEEEEEEE', matchingUser)
  done(null, matchingUser);
});

const app = express();

app.use(session({
  genid: (req) => uuid(),
  secret: SESSION_SECRECT,
  resave: false,
  saveUninitialized: false,

}));

app.use(passport.initialize());
app.use(passport.session());

server.applyMiddleware({ app });

app.listen({ port: 4000 }, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}`);
});