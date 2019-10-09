const { gql } = require('apollo-server-express');

module.exports = gql`
type Query {
  info: String!
  feed: [Post!]
  currentUser: User
}

type Mutation {
  createNewPost(url: String!, description: String!, community: String!): Post!
  createNewCommunity(name: String!, category: String!, hasPosts: Boolean!, hasMessages: Boolean!, privacy: String!): Community!
  signup(email: String!, password: String!, username: String!, firstName: String!, lastName: String!): AuthPayload
  login(email: String!, password: String!): AuthPayload
  setCommunity(userId: String!, communityId: String!) : User
  logout: Boolean
}

type Subscription {
  newPosts: Post
}

# Define schema based on Prisma DB relations

type User {
  id: ID!
  firstName: String!
  lastName: String!
  email: String!
  username: String!
  password: String!
  messages: [Message!]
  communities: [Community!]
  ownerOf: [Community!]! 
  posts: [Post!]!
}

type AuthPayload {
  user: User
}

type Community {
    id: ID!
    name: String!
    category: String!
    posts: [Post!]!
    hasPosts: Boolean!
    hasMessages: Boolean!
    privacy: String!
    users: [User!]
    owner: User!
}

type Post {
  id: ID!
  description: String!
  url: String!
  postedBy: User
  community: Community!
}

type Message {
    id: ID!
    sender: User!
    recip: String!
    content: String!
    community: Community!
}
`