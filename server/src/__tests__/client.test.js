const request = require("supertest");

const { app } = require("../../app");

/**
 * Usually we would need to mock the database, but as it is already a mocked database
 * so I left that part out
 */
let server = null;

beforeAll(() => {
  server = app.listen(5000);
});

const clientSearchQuery = searchString => `
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
      clients => expect(clients.length).toBe(44),
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
});

afterAll(() => server.close());

const testClientQuery = (searchString, checkClients, done) => {
  request(app)
    .post(`/graphql?query=${clientSearchQuery(searchString)}`)
    .expect(200)
    .expect(res => {
      checkClients(res.body.data.clients);
    })
    .end((err, res) => done(err));
};
