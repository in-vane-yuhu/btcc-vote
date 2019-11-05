import ApolloClient, { gql } from 'apollo-boost'
import errMsg from './error'

const onError = err => {
  console.log({ onError: err })
}

const client = new ApolloClient({
  uri: 'https://graphql.example.com',
  onError: onError
})

const query = client
  .query({
    query: gql`{}`
  })
  .then(res => {
    console.log({ query: res })
  })

const mutation = client
  .mutate({
    mutation: gql`{}`
  })
  .then(res => {
    console.log({ mutation: res })
  })

export { query, mutation }
