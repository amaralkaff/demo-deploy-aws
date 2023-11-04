const request = require("supertest");
const app = require("../app");
const fs = require("fs");
const { sequelize } = require("../models");
const { token } = require("../helpers/jwt");
const { error } = require("console");

let access_token;
let access_token2;
beforeAll(async () => {
  const users = require("../data/user.json").map((user) => {
    delete user.id;
    user.createdAt = new Date();
    user.updatedAt = new Date();
    return user;
  });
  await sequelize.queryInterface.bulkInsert("Users", users, {});
  const companies = require("../data/company.json").map((company) => {
    delete company.id;
    company.createdAt = new Date();
    company.updatedAt = new Date();
    return company;
  });
  await sequelize.queryInterface.bulkInsert("Companies", companies, {});
  const jobs = require("../data/job.json").map((job) => {
    delete job.id;
    job.createdAt = new Date();
    job.updatedAt = new Date();
    return job;
  });
  await sequelize.queryInterface.bulkInsert("Jobs", jobs, {});
  let payload = {
    id: 1,
    email: "admin@mail.com",
    role: "admin",
  };
  let payload2 = {
    id: 2,
    email: "guest@mail.com",
    role: "staff",
  };
  access_token = token(payload);
  access_token2 = token(payload2);
});

afterAll(async () => {
  await sequelize.queryInterface.bulkDelete("Users", null, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
  await sequelize.queryInterface.bulkDelete("Jobs", null, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
  await sequelize.queryInterface.bulkDelete("Companies", null, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
});

// GET /pub/jobs
describe("GET /pub/jobs", () => {
  it("berhasil mendapatkan Entitas Utama tanpa menggunakan query filter parameter", async () => {
    const response = await request(app)
      .get("/pub/jobs")
      .set("Authorization", `Bearer ${access_token}`);
    expect(response.status).toBe(200);
    // console.log(response.body, "ini response");
    expect(response.body).toHaveProperty("message", "Jobs found successfully");
    expect(response.body).toHaveProperty("data");
    // console.log(response.body.data, "ini data");
    expect(response.body.data).toHaveProperty("count");
    // console.log(response.body.data.count, "ini count");
    expect(response.body.data).toHaveProperty("rows");
    // console.log(response.body.data.rows.length, "ini length");
    expect(response.body.data.rows.length).toBe(10);
  });
  it("berhasil mendapatkan Entitas Utama dengan 1 query filter parameter", async () => {
    const response = await request(app)
      .get("/pub/jobs?filter=1")
      .set("Authorization", `Bearer ${access_token}`);
    expect(response.status).toBe(200);
    // console.log(response.body, "ini response");
    expect(response.body).toHaveProperty("message", "Jobs found successfully");
    expect(response.body).toHaveProperty("data");
    // console.log(response.body.data, "ini data");
    expect(response.body.data).toHaveProperty("count");
    expect(response.body.data).toHaveProperty("rows");
    expect(response.body.data.rows.length).toBe(1);
  });
  it("berhasil mendapatkan Entitas Utama serta panjang yang sesuai ketika memberikan page tertentu (cek pagination-nya)", async () => {
    const response = await request(app)
      .get("/pub/jobs?page=2")
      .set("Authorization", `Bearer ${access_token}`);
    expect(response.status).toBe(200);
    // console.log(response.body, "ini response");
    expect(response.body).toHaveProperty("message", "Jobs found successfully");
    expect(response.body).toHaveProperty("data");
    // console.log(response.body.data, "ini data");
    expect(response.body.data).toHaveProperty("count");
    expect(response.body.data).toHaveProperty("rows");
    expect(response.body.data.rows.length).toBe(10);
  });
});

// GET /pub/jobs/:id
describe("GET /pub/jobs/:id", () => {
  it("berhasil mendapatkan 1 Entitas Utama sesuai dengan params id yang diberikan", async () => {
    const response = await request(app)
      .get("/pub/jobs/1")
      .set("Authorization", `Bearer ${access_token}`);
    expect(response.status).toBe(200);
    // console.log(response.body, "ini response");
    expect(response.body).toHaveProperty("message", "Job found successfully");
    expect(response.body).toHaveProperty("data");
    // console.log(response.body.data, "ini data");
    expect(response.body.data).toHaveProperty("id");
    expect(response.body.data).toHaveProperty("title");
    expect(response.body.data).toHaveProperty("description");
    expect(response.body.data).toHaveProperty("companyId");
    // expect(response.body.data).toHaveProperty("createdAt");
    // expect(response.body.data).toHaveProperty("updatedAt");
  });
  it("gagal mendapatkan Entitas Utama karena params id yang diberikan tidak ada di database/invalid", async () => {
    const response = await request(app)
      .get("/pub/jobs/100")
      .set("Authorization", `Bearer ${access_token}`);
    expect(response.status).toBe(404);
    // console.log(response.body, "ini response");
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toEqual(["Job not found"]);
  });
});
