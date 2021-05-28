// import { URLDATA } from "./Config";
// import { InMemoryCache } from "apollo-cache-inmemory";
// import { createUploadLink } from "apollo-upload-client";
// import ApolloClient from "apollo-client";
// import { setContext } from "apollo-link-context";

// const link = createUploadLink({ uri: URLDATA.url });

// const authLink = setContext((_, { headers }) => {
//   const token = localStorage.getItem("token");

//   return {
//     headers: {
//       access_token: `${token}`,
//     },
//   };
// });

// export const Client = new ApolloClient({
//   link: authLink.concat(link),
//   cache: new InMemoryCache(),
// });

// export const mutationQueries = (Query, Variables) =>
//   Client.mutate({
//     variables: Variables,
//     mutation: Query,
//   });
