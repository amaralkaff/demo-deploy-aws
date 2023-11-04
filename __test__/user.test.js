const request = require("supertest");
const app = require("../app");
const { sequelize } = require("../models");
const { token } = require("../helpers/jwt");

let access_token;
let pass = "$2a$10$jmZeLeF.u8m7YlRsA7vDmuaW91RRnJ2lSTlU81riSICEIw.haNLwy";
beforeAll(async () => {
  await sequelize.queryInterface.bulkInsert(
    "Users",
    [
      {
        username: "palepale12",
        password: pass,
        email: "asdaadas1@gmail.comA",
        role: "admin",
        phoneNumber: "08236478786",
        address: "jalan di hatimu",
        createdAt: "2023-10-30T09:24:17.000Z",
        updatedAt: "2023-10-30T09:24:17.000Z",
      },
    ],
    {}
  );

  const payload = {
    id: 1,
    email: "asdaadas1@gmail.comA",
    role: "admin",
  };

  access_token = token(payload);
});

afterAll(async () => {
  await sequelize.queryInterface.bulkDelete("Users", null, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
});
// Login
describe("POST /login", () => {
  it("berhasil login dan mengirimkan token - (Admin)", async () => {
    const body = {
      email: "asdaadas1@gmail.comA",
      password: "asddasdasd",
    };
    const response = await request(app).post("/login").send(body);
    expect(response.statusCode).toEqual(200);
    // console.log(response.body, "<<<<<<");
    expect(response.body).toHaveProperty("access_token", expect.any(String));
  });
  it("Email tidak diberikan / tidak diinput", async () => {
    const body = {
      email: "",
      password: "test1",
    };
    const response = await request(app).post("/login").send(body);
    expect(response.statusCode).toEqual(401);
    expect(response.body).toHaveProperty("message", "Email is required");
  });
  it("Password tidak diberikan / tidak diinput", async () => {
    const body = {
      email: "asdaadas1@gmail.comA",
      password: "",
    };
    const response = await request(app).post("/login").send(body);
    expect(response.statusCode).toEqual(401);
    expect(response.body).toHaveProperty("message", "Password is required");
  });
  it("Email diberikan invalid / tidak terdaftar", async () => {
    const body = {
      email: "adminasd@mail.com",
      password: "test1",
    };
    const response = await request(app).post("/login").send(body);
    expect(response.statusCode).toEqual(404);
    expect(response.body).toHaveProperty("message", "Not Found email");
  });
  it("Password diberikan salah / tidak match", async () => {
    const body = {
      email: "asdaadas1@gmail.comA",
      password: "test2",
    };
    const response = await request(app).post("/login").send(body);
    expect(response.statusCode).toEqual(401);
    expect(response.body).toHaveProperty("message", "Invalid password");
  });
});
// Add User
describe("POST /add-user", () => {
  it("berhasil menambahkan user - (Admin)", async () => {
    const body = {
      username: "palepale12",
      password: "asddasdasd",
      email: "palepale@gmail.com",
      role: "staff",
      phoneNumber: "08236478786",
      address: "jalan di hatimu",
    };
    const response = await request(app)
      .post("/add-user")
      .set("Authorization", `Bearer ${access_token}`)
      .send(body);
    expect(response.statusCode).toEqual(201);
    // console.log(response.body, "<<<<<<");
    expect(response.body).toHaveProperty("data", expect.any(Object));
  });
  it("Email tidak diberikan / tidak diinput", async () => {
    const body = {
      username: "palepale12",
      password: "asddasdasd",
      email: "",
      role: "staff",
      phoneNumber: "08236478786",
      address: "jalan di hatimu",
    };
    const response = await request(app)
      .post("/add-user")
      .set("Authorization", `Bearer ${access_token}`)
      .send(body);
    expect(response.statusCode).toEqual(400);
    expect(response.body).toHaveProperty("errors", expect.any(Array));
  });
  it("Password tidak diberikan / tidak diinput", async () => {
    const body = {
      username: "palepale12",
      password: "",
      email: "palepale@gmail.com",
      role: "staff",
      phoneNumber: "08236478786",
      address: "jalan di hatimu",
    };
    const response = await request(app)
      .post("/add-user")
      .set("Authorization", `Bearer ${access_token}`)
      .send(body);
    expect(response.statusCode).toEqual(400);
    expect(response.body).toHaveProperty("errors", expect.any(Array));
  });
  it("Email diberikan string kosong", async () => {
    const body = {
      username: "palepale12",
      password: "asddasdasd",
      email: " ",
      role: "staff",
      phoneNumber: "08236478786",
      address: "jalan di hatimu",
    };
    const response = await request(app)
      .post("/add-user")
      .set("Authorization", `Bearer ${access_token}`)
      .send(body);
    expect(response.statusCode).toEqual(400);
    expect(response.body).toHaveProperty("errors", expect.any(Array));
  });
  it("Password diberikan string kosong", async () => {
    const body = {
      username: "palepale12",
      password: " ",
      email: "palepale@gmail.com",
      role: "staff",
      phoneNumber: "08236478786",
      address: "jalan di hatimu",
    };
    const response = await request(app)
      .post("/add-user")
      .set("Authorization", `Bearer ${access_token}`)
      .send(body);
    expect(response.statusCode).toEqual(400);
    expect(response.body).toHaveProperty("errors", expect.any(Array));
  });
  it("Email sudah terdaftar", async () => {
    const body = {
      username: "palepale12",
      password: "asddasdasd",
      email: "asdaadas1@gmail.comA",
      role: "staff",
      phoneNumber: "08236478786",
      address: "jalan di hatimu",
    };
    const response = await request(app)
      .post("/add-user")
      .set("Authorization", `Bearer ${access_token}`)
      .send(body);
    expect(response.statusCode).toEqual(400);
    expect(response.body).toHaveProperty("errors", expect.any(Array));
  });
  it("Email diberikan format yang salah / invalid", async () => {
    const body = {
      username: "palepale12",
      password: "asddasdasd",
      email: "palepalegmail.com",
      role: "staff",
      phoneNumber: "08236478786",
      address: "jalan di hatimu",
    };
    const response = await request(app)
      .post("/add-user")
      .set("Authorization", `Bearer ${access_token}`)
      .send(body);
    expect(response.statusCode).toEqual(400);
    expect(response.body).toHaveProperty("errors", expect.any(Array));
  });
  it("Gagal menambahkan user karena tidak terdapat access_token", async () => {
    const body = {
      username: "palepale12",
      password: "asddasdasd",
      email: "asdaadas1@gmail.comA",
      role: "staff",
      phoneNumber: "08236478786",
      address: "jalan di hatimu",
    };
    const response = await request(app).post("/add-user").send(body);
    expect(response.statusCode).toEqual(401);
    expect(response.body).toHaveProperty("errors", expect.any(Array));
  });
  it("Gagal menambahkan user karena token yang diberikan tidak valid (random string)", async () => {
    const body = {
      username: "palepale12",
      password: "asddasdasd",
      email: "asdaadas1@gmail.comA",
      role: "staff",
      phoneNumber: "08236478786",
      address: "jalan di hatimu",
    };
    const response = await request(app)
      .post("/add-user")
      .set("Authorization", `Bearer huktdyjt`)
      .send(body);
    expect(response.statusCode).toEqual(401);
    expect(response.body).toHaveProperty("errors", expect.any(Array));
  });
});
