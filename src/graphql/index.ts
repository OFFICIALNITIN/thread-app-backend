import { ApolloServer } from "@apollo/server";
import { User } from "./user";

async function createApolloGraphqlServer() {
  //Create Graphql Server
  const gqlServer = new ApolloServer({
    typeDefs: `
      ${User.typeDefs}
      type Query {
        ${User.queries}
      }

      type Mutation {
       ${User.mutations}
      }
    `, //Schema
    resolvers: {
      Query: {
        ...User.resolvers.queries,
      },
      Mutation: {
        ...User.resolvers.mutations,
      },
    }, // Functions
  });

  //Start the gql Server
  await gqlServer.start();

  return gqlServer;
}

export default createApolloGraphqlServer;
