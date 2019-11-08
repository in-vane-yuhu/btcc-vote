import ApolloClient, { gql } from 'apollo-boost'
import { message } from 'antd'
import formatErrorMessage from './error'

message.config({
  maxCount: 1
})

const onError = err => {
  message.error(formatErrorMessage(err.graphQLErrors[0].message))
}

const client = new ApolloClient({
  uri: 'http://119.3.106.151:4001/',
  onError: onError
})

const query = async (body, variables) => {
  message.loading('努力加载中...')
  return client
    .query({
      query: gql`
        ${body}
      `,
      variables
    })
    .then(res => {
      message.destroy()
      return res.data
    })
}

const mutation = async (body, variables) => {
  message.loading('努力加载中...')
  return client
    .mutate({
      mutation: gql`
        ${body}
      `,
      variables
    })
    .then(res => {
      message.destroy()
      return res.data
    })
}

export { query, mutation }
