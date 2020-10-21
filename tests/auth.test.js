require('cross-fetch/polyfill')
const {gql} = require('apollo-boost');
const {prisma} = require('../src/generated');
const {client} = require('./utils');

beforeAll(async () => {
  await prisma.deleteManyUsers()
})

describe('tests the User Crud', () => {
  test('should signUp a user', async () => {
    const SIGN_UP =gql`
      mutation signUp($username: String!, $password: String!) {
        signUp(username: $username, password: $password) {
          __typename
          ... on SignUpResponse {
            token
            user {
              id
              username
            }
          }
          ... on UserFoundError {
            message
          }
        }
      }
    `;
    const signUpRes = await client.mutate({
      mutation: SIGN_UP , variables: {username: 'Dan', password: "Oregon"}
    })

    expect(signUpRes.data.signUp.user.username).toMatch('Dan')
  })
})