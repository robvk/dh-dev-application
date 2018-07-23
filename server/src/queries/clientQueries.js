const { GraphQLList, GraphQLString, GraphQLNonNull } = require("graphql");

const { findClientsWithSubString } = require("../db/databaseAbstraction");
const { clientType } = require("../types/clientType");

const clientQueries = {
  clients: {
    type: new GraphQLList(clientType),
    args: {
      searchString: {
        type: new GraphQLNonNull(GraphQLString),
        description:
          "The first_name, last_name and origin fields will be searched for the searchString (as a subString)"
      }
    },
    resolve: (root, args) => {
      const { searchString } = args;
      return new Promise(resolve =>
        resolve(findClientsWithSubString(searchString))
      );
    }
  }
};

module.exports = { clientQueries };
