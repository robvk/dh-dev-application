/** The abstraction of a real database that handles queries */
const _ = require("lodash");
const path = require("path");
const fs = require("fs");

// import the data from our clients.json file
function readData() {
  const data = JSON.parse(fs.readFileSync(path.resolve(__dirname, "./clients.json")));

  /** I changed 2 things:
   * 1. Converted the id field from an unnecessary object to a string to make manipulation
   *    much simpler and clearer
   * 2. Pre-emptively added an index to speed things up
   */
  return _.map(data, client => ({
    ...client,
    id: client.id.$oid,
    index: _.lowerCase(
      client.first_name + "###" + client.last_name + "###" + client.origin
    )
  }));
}

const database = readData();

// interface to the data
function findClientsWithSubString(filterString) {
  // The search is not case sensitive so lowercase the string
  const filterStringAsLowerCase = _.lowerCase(filterString);

  return database.filter(client =>
    _.includes(client.index, filterStringAsLowerCase)
  );
}

module.exports = {
  findClientsWithSubString
};
