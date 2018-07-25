const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLBoolean
} = require("graphql");

// itemType describes the element
const pageType = itemType => {
  return new GraphQLObjectType({
    name: "Page",
    description: "Page",
    fields: {
      totalCount: { type: GraphQLInt },
      items: { type: new GraphQLList(itemType) }
    }
  });
};

module.exports = {
  pageType
};
