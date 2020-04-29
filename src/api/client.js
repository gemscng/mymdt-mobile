import Config from 'react-native-config';

// V3.0 beta using @apollo/client https://www.apollographql.com/docs/react/v3.0-beta/networking/authentication/
// import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
// import {setContext} from 'apollo-link-context'

// const httpLink = createHttpLink({
//   uri: `${Config.API_SCHEME}://${Config.API_ENDPOINT}`,
//   fetch: (...pl) => {
//     const [_, options] = pl
//     const body = JSON.parse(options.body)
//     console.log(`📡${body.operationName || ''}\n${body.query}`, body.variables)
//     console.log('headers', body.headers)
//     return fetch(...pl)
//   },
// });

// const authLink = setContext((_, { headers }) => {
//   console.log('headers in authlink',headers)
//   return {
//     headers: {
//       ...headers,
//       authorization: `Bearer testing`,
//     }
//   }
// });

// const client = new ApolloClient({
//   link: authLink.concat(httpLink),
//   cache: new InMemoryCache(),
// });

// V2.6 using apollo-boost https://www.apollographql.com/docs/react/networking/authentication/

import ApolloClient,{InMemoryCache} from 'apollo-boost';

const client = new ApolloClient({
  uri: `${Config.API_SCHEME}://${Config.API_ENDPOINT}`,
  request: async operation => {
    operation.setContext({
      headers: {
        authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySUQiOiI1YmVjZDJlMy04Y2Y1LTQ4NWMtYjZmNC04NjZhOTY2ZTUwZDgiLCJMb2NhbGUiOiJlbi1VUyIsImV4cCI6MTU4ODE0ODU1NiwiaXNzIjoiTWVhc3VyYWJsZSBBSSJ9.vK0jtmBmqVQCOVgN9lxOM4plX0KdTRStLamH8hqlpSc',
      }
    });
  },
  fetch: (...pl) => {
    const [_, options] = pl
    const body = JSON.parse(options.body)
    console.log(`📡${body.operationName || ''}\n${body.query}`, body.variables)
    console.log('headers', body.headers)
    return fetch(...pl)
  },
  cache: new InMemoryCache()
});

export default client;
