const { app } = require("./app");

const port = 4000;
app.listen(port);
console.log(
  `Running a GraphQL API server at localhost:${port.toString()}/graphql`
);
