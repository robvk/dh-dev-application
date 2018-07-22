const express = require("express");
const graphqlHTTP = require("express-graphql");

const { schema } = require("./src/schema");

const app = express();
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true
  })
);

// export for testing
module.exports = { app };