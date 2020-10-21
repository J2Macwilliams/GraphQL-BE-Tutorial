const {gql} = require('apollo-server');

const typeDefs = gql`


type User {
  id: ID
  username: String
  password: String
}

 type SignUpResponse {
  token: String
  user: User
 }

union UserRegResult = SignUpResponse | UserFoundError

type UserFoundError {
  message: String
}

 type Mutation {
   signUp(username: String!, password: String!): UserRegResult!
 }

 type Query {
   currentUser(id: ID): User
 }

`
module.exports = typeDefs