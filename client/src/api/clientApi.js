import axios from "axios";

const clientSearchQuery = (searchString, limit, offset) => {
  let searchArgString = `searchString: "${searchString}"`;
  if (limit) searchArgString += `, limit: ${limit}`;
  if (offset) searchArgString += `, offset: ${offset}`;

  return `
{
  clients(${searchArgString}) {
    totalCount
    items {
        id
        first_name
        last_name
        photo
        origin
    }
  }
}
`;
};

export const findClientsAsync = (
  searchString: string,
  limit: number,
  offset: number,
  callback: Function
) =>
  axios
    .get(`/graphql?query=${clientSearchQuery(searchString, limit, offset)}`)
    .then(res => {
      const data = res.data.data.clients;
      callback(data.items, data.totalCount);
    });
