const request = require("supertest");

const { app } = require("../../app");

/**
 * Usually we would need to mock the database, but as it is already a mocked database
 * I left that part out
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
    request(app)
      .post(`/graphql?query=${clientSearchQuery("Port")}`)
      .expect(200)
      .expect(res => {
        const clients = res.body.data.clients;
        clients.forEach(client => expect(client.index).toBeFalsy());
      })
      .end((err, res) => done(err));
  });

  it("should return all the requested client fields", done => {
    request(app)
      .post(`/graphql?query=${clientSearchQuery("Port")}`)
      .expect(200)
      .expect(res => {
        const clients = res.body.data.clients;
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
      })
      .end((err, res) => done(err));
  });

  it("should filter on origin", done => {
    request(app)
      .post(`/graphql?query=${clientSearchQuery("Portugal")}`)
      .expect(200)
      .expect(res => {
        const clients = res.body.data.clients;
        expect(clients.length).toBe(44);
      })
      .end((err, res) => done(err));
  });

  it("should filter on first name", done => {
    request(app)
      .post(`/graphql?query=${clientSearchQuery("Lisa")}`)
      .expect(200)
      .expect(res => {
        const clients = res.body.data.clients;
        expect(clients.length).toBe(4);
      })
      .end((err, res) => done(err));
  });

  it("should filter on last name", done => {
    request(app)
      .post(`/graphql?query=${clientSearchQuery("Willavoys")}`)
      .expect(200)
      .expect(res => {
        const clients = res.body.data.clients;
        expect(clients.length).toBe(1);
      })
      .end((err, res) => done(err));
  });

  it("should not filter on email", done => {
    request(app)
      .post(`/graphql?query=${clientSearchQuery("lbishop3@whitehouse.gov")}`)
      .expect(200)
      .expect(res => {
        const clients = res.body.data.clients;
        expect(clients.length).toBe(0);
      })
      .end((err, res) => done(err));
  });

  it("should return 404 for everything else", done => {
    request(server)
      .get("/foo")
      .expect(404)
      .end((err, res) => done(err));
  });
});

afterAll(() => server.close());
