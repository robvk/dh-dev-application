import axios from "axios";

const query = searchString => `
  {
    clients(searchString: "${searchString}") {
      id
      first_name
      last_name
      email
      photo
      origin
    }
  }
`;

export const findClientsAsync = (searchString: string, callback: Function) =>
  axios
    .get(`/graphql?query=${query(searchString)}`)
    .then(res => callback(res.data.data.clients));
