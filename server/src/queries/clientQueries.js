const {
  GraphQLList,
  GraphQLString,
  GraphQLNonNull,
  GraphQLInt
} = require("graphql");
const sortBy = require("lodash/sortBy");
const slice = require("lodash/slice");

const { findClientsWithSubString } = require("../db/databaseAbstraction");
const { clientType } = require("../types/clientType");
const { pageType } = require("../types/pagination");

const clientQueries = {
  clients: {
    type: pageType(clientType),
    description:
      "Return the 'limit' number of clients matching the 'searchString' (on first_name, last_name and origin) 'after' the specified cursor",
    args: {
      searchString: {
        type: new GraphQLNonNull(GraphQLString),
        description:
          "The first_name, last_name and origin fields will be searched for the searchString (as a subString)"
      },
      limit: {
        type: GraphQLInt,
        description:
          "Limits the number of results returned in the page. Defaults to 10."
      },
      offset: {
        type: GraphQLInt,
        description: "The index to start searching. Defaults to 0."
      }
    },
    resolve: (root, args) => {
      const { limit = 10, offset = 0, searchString } = args;

      return new Promise(resolve => {
        const filteredClients = findClientsWithSubString(searchString);
        const sorted = sortBy(filteredClients, ["last_name"]);

        const returnList = slice(sorted, offset, offset + limit);

        return resolve({
          totalCount: sorted.length,
          items: returnList
        });
      });
    }
  }
};

module.exports = { clientQueries };
