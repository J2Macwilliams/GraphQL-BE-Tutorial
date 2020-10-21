import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  onError: (e) => { console.log(e) },
});

module.exports = {client}