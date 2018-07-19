const { GraphQLSchema, GraphQLObjectType } = require("graphql");

const { clientQueries } = require("./queries/clientQueries");

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "Query",
    fields: () => ({
      ...clientQueries
    })
  })
});

module.exports = { schema };
