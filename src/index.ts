import express from "express";
import createApolloGraphqlServer from "./graphql";
import { expressMiddleware } from "@apollo/server/express4";

async function init() {
  const app = express();
  const PORT = Number(process.env.PORT) || 8000;

  app.use(express.json());

  app.get("/", (req, res) => {
    res.send({ message: "Server is running" });
  });

  app.use("/graphql", expressMiddleware(await createApolloGraphqlServer()));

  app.listen(PORT, () => {
    console.log(`Server started at  PORT ${PORT}`);
  });
}

init();
