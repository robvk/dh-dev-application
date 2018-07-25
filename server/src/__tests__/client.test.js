const request = require("supertest");

const { app } = require("../../app");

/**
 * Usually we would need to mock the database, but as it is already a mocked database
 * so I left that part out. Even though a smaller test database would have been useful
 */
let server = null;

beforeAll(() => {
  server = app.listen(5000);
});

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
        email
        photo
        origin
    }
  }
}
`;
};

describe("GET clients", () => {
  it("should accept requests", done => {
    request(app)
      .post(`/graphql?query=${clientSearchQuery("Port")}`)
      .expect(200)
      .end((err, res) => done(err));
  });

  it("should not expose the index property", done => {
    testClientQuery(
      "Port",
      clients => clients.forEach(client => expect(client.index).toBeFalsy()),
      done
    );
  });

  it("should return all the requested client fields", done => {
    testClientQuery(
      "Port",
      clients => {
        const fields = [
          "id",
          "first_name",
          "last_name",
          "email",
          "photo",
          "origin"
        ];

        clients.forEach(client =>
          fields.forEach(field => expect(client[field]).toBeTruthy())
        );
      },
      done
    );
  });

  it("should filter on origin", done => {
    testClientQuery(
      "Portugal",
      clients => expect(clients.length).toBe(10),
      done
    );
  });

  it("should filter on first name", done => {
    testClientQuery("Lisa", clients => expect(clients.length).toBe(4), done);
  });

  it("should filter on last name", done => {
    testClientQuery(
      "Willavoys",
      clients => expect(clients.length).toBe(1),
      done
    );
  });

  it("should not filter on email", done => {
    testClientQuery(
      "lbishop3@whitehouse.gov",
      clients => expect(clients.length).toBe(0),
      done
    );
  });

  it("should return 404 for everything else", done => {
    request(server)
      .get("/foo")
      .expect(404)
      .end((err, res) => done(err));
  });

  it("should only return the amount in limit", done => {
    testClientQuery(
      "Portugal",
      clients => expect(clients.length).toBe(20),
      done,
      20
    );
  });

  it("should return clients from the offset default being 0", done => {
    testClientQuery(
      "Portugal",
      clients => expect(clients[0].id).toBe("59a2afbcfc13ae278700045a"),
      done,
      10
    );
  });

  it("should return clients from the offset", done => {
    testClientQuery(
      "Portugal",
      clients => expect(clients[0].id).toBe("59a2afbefc13ae2787000708"),
      done,
      10,
      10
    );
  });
});

afterAll(() => server.close());

const testClientQuery = (searchString, checkClients, done, limit, offset) => {
  request(app)
    .post(`/graphql?query=${clientSearchQuery(searchString, limit, offset)}`)
    .expect(200)
    .expect(res => {
      const data = res.body.data.clients;
      checkClients(data.items, data.totalCount);
    })
    .end((err, res) => done(err));
};
