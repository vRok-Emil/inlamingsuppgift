import {gql} from "apollo-server-express"

export const typeDefs = gql`
 type Query {
  users: [User]
  user(id: ID!): User
}

type Mutation {
  createUser(name: String!, email: String!): User
}

type User {
  id: ID!
  username: String!
  email: String!
}

`