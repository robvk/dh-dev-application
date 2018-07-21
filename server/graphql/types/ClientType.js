const { GraphQLObjectType, GraphQLString } = require("graphql");
const { GenderType } = require("./GenderType");

const ClientType = new GraphQLObjectType({
  name: "Client",
  description: "Our clients and everything we have on them",
  fields: {
    id: {
      type: GraphQLString,
      description: "A hexadecimal unique identifier"
    },
    first_name: { type: GraphQLString },
    last_name: { type: GraphQLString },
    email: { type: GraphQLString },
    gender: { type: GenderType },
    photo: {
      type: GraphQLString,
      description: "A url to a hosted foto of the client"
    },
    origin: {
      type: GraphQLString,
      description: "The country of origin of this client"
    }
  }
});

module.exports = { ClientType };
