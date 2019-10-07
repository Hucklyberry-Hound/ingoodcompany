const { GraphQLServer } = require('graphql-yoga')
const { prisma } = require('./generated/prisma-client')
const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const User = require('./resolvers/User')
const Post = require('./resolvers/Post')
const Subscription = require('./resolvers/Subscription')
const Community = require('./resolvers/Community')


const resolvers = {
    Query,
    Mutation,
    Subscription,
    User,
    Post,
    Community
  }

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context: request => {
      return {
        ...request,
        prisma,
      }
    },
  })
server.start(() => console.log(`Server is running on http://localhost:4000`))


// David's general tips & notes

// Look more into understanding graphql & how it works. what problems does it solve & what does it replace from our regular architecture stack
// Map out a CONCRETE user flow. When I go to your website, how do I get set up with a new community? What if I'm trying to join a community that already exists? These should be mapped out sooner rather than later.
//  Start getting setup with your client side application. You should use the user-flow to figure out what the application flow would look like. You should also be creating wireframes based on the user flow you define.
//  Sounds like you're getting an understanding of the backend with this project. Try to figure out how to connect the backend to the frontend.
// Also might be worth trying to deploy these soon so you don't have to worry about this headache later. You're allowed to pick Ben's brain on deploying a graphql server.