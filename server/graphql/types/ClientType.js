const { GraphQLObjectType, GraphQLString } = require("graphql");

const ClientType = new GraphQLObjectType({
  name: "Client",
  description: "Our clients and everything we have on them",
  fields: {
    id_hex: {
      type: GraphQLString,
      description: "The hexadecimal representation of the uid"
    },
    first_name: { type: GraphQLString },
    last_name: { type: GraphQLString },
    email: { type: GraphQLString },
    gender: { type: GraphQLString },
    photo_url: {
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
