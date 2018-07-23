/**
 * Representation of our gender possibilities, not very gender neutral!
 */

const { GraphQLEnumType } = require("graphql");

const genderType = new GraphQLEnumType({
  name: "genderStateEnum",
  values: {
    male: {
      value: "Male"
    },
    female: {
      value: "Female"
    }
  }
});

module.exports = {
  genderType
};
