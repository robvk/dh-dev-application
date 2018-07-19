const { GraphQLList } = require("graphql");

const { ClientType } = require("../types/ClientType");

//TODO: query fetching data from real clients.json
//TODO: query based on a matching string
const clientQueries = {
  clients: {
    type: new GraphQLList(ClientType),
    resolve: () => new Promise(resolve =>
      resolve([
        {
          id_hex: "59a2afbbfc13ae278700044c",
          first_name: "Rochella",
          last_name: "Chipchase",
          email: "rchipchase0@joomla.org",
          gender: "Female",
          photo_url:
            "https://robohash.org/molestiaedoloremquesed.jpg?size=50x50&set=set1",
          origin: "Honduras"
        },
        {
          id_hex: "59a2afbbfc13ae278700044d",
          first_name: "Sophia",
          last_name: "Mayler",
          email: "smayler1@goo.ne.jp",
          gender: "Female",
          photo_url:
            "https://robohash.org/perspiciatisoditatque.png?size=50x50&set=set1",
          origin: "Zimbabwe"
        },
        {
          id_hex: "59a2afbbfc13ae278700044e",
          first_name: "Bartram",
          last_name: "Nassi",
          email: "bnassi2@goodreads.com",
          gender: "Male",
          photo_url: "https://robohash.org/aeablanditiis.bmp?size=50x50&set=set1",
          origin: "Egypt"
        },
        {
          id_hex: "59a2afbbfc13ae278700044f",
          first_name: "Lina",
          last_name: "Bishop",
          email: "lbishop3@whitehouse.gov",
          gender: "Female",
          photo_url:
            "https://robohash.org/errorfacereconsequatur.bmp?size=50x50&set=set1",
          origin: "China"
        }
      ])
    )
  }
};

module.exports = { clientQueries };
