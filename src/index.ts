import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";

async function init() {
  const app = express();
  const PORT = Number(process.env.PORT) || 8000;

  app.use(express.json());

  //Create Graphql Server
  const gqlServer = new ApolloServer({
    typeDefs: `
      type Query {
        hello: String
        say(name:String):String
      }
    `, //Schema
    resolvers: {
      Query: {
        hello: () => `Hey there, I am a graphql server`,
        say: (_, { name }: { name: string }) => `Hey ${name}, how are you?`,
      },
    }, // Functions
  });

  //Start the gql Server
  await gqlServer.start();

  app.get("/", (req, res) => {
    res.send({ message: "Server is running" });
  });

  app.use("/graphql", expressMiddleware(gqlServer));

  app.listen(PORT, () => {
    console.log(`Server started at  PORT ${PORT}`);
  });
}

init();
