const request = require("supertest");
const app = require("../app");
const fs = require("fs").readFileSync("./public/watermelon.jpg");
const { sequelize } = require("../models");
const { token } = require("../helpers/jwt");

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

// POST /jobs
describe("POST /jobs", () => {
  it("berhasil membuat job baru - (Admin)", async () => {
    const body = {
      title: "Frontend Developer",
      description: "Membuat aplikasi frontend",
      imgUrl: "https://www.google.com",
      jobType: "full time",
      companyId: 1,
      authorId: 1,
    };
    const response = await request(app)
      .post("/jobs")
      .send(body)
      .set("Authorization", `Bearer ${access_token}`);
    // console.log(response.body, "<<<<<<");
    expect(response.statusCode).toEqual(201);
    expect(response.body).toHaveProperty("message", "Job created successfully");
    expect(response.body).toHaveProperty("data", expect.any(Object));
  });
  it("Gagal membuat job baru - (belum login)", async () => {
    const body = {
      title: "Frontend Developer",
      description: "Membuat aplikasi frontend",
      imgUrl: "https://www.google.com",
      jobType: "full time",
      companyId: 1,
    };
    const response = await request(app).post("/jobs").send(body);
    expect(response.statusCode).toEqual(401);
    expect(response.body).toHaveProperty("errors", expect.any(Object));
  });
  it("Gagal membuat job baru - (token tidak valid)", async () => {
    const body = {
      title: "Frontend Developer",
      description: "Membuat aplikasi frontend",
      imgUrl: "https://www.google.com",
      jobType: "full time",
      companyId: 1,
    };
    const response = await request(app)
      .post("/jobs")
      .send(body)
      .set("Authorization", `Bearer sdasfasf`);
    expect(response.statusCode).toEqual(401);
    expect(response.body).toHaveProperty("errors", expect.any(Array));
  });
  it("Gagal membuat job baru - (validation required)", async () => {
    const body = {
      title: "",
      description: "",
      imgUrl: "",
      jobType: "",
      companyId: "",
      authorId: "",
    };
    const response = await request(app)
      .post("/jobs")
      .send(body)
      .set("Authorization", `Bearer ${access_token}`);
    expect(response.statusCode).toEqual(400);
    expect(response.body).toHaveProperty("errors", expect.any(Array));
  });
});

//GET /jobs
describe("GET /jobs", () => {
  it("berhasil mendapatkan data jobs - (Admin)", async () => {
    const response = await request(app)
      .get("/jobs")
      .set("Authorization", `Bearer ${access_token}`);
    expect(response.statusCode).toEqual(200);
    expect(response.body).toHaveProperty("massage", "Jobs found successfully");
    expect(response.body).toHaveProperty("data", expect.any(Array));
  });
  it("Gagal mendapatkan data jobs - (belum login)", async () => {
    const response = await request(app).get("/jobs");
    expect(response.statusCode).toEqual(401);
    expect(response.body).toHaveProperty("errors", expect.any(Object));
  });
  it("Gagal mendapatkan data jobs - (token tidak valid)", async () => {
    const response = await request(app)
      .get("/jobs")
      .set("Authorization", `Bearer sdasfasf`);
    expect(response.statusCode).toEqual(401);
    expect(response.body).toHaveProperty("errors", expect.any(Array));
  });
});

// GET /jobs/:id
describe("GET /jobs/:id", () => {
  it("berhasil mendapatkan data job - (Admin)", async () => {
    const response = await request(app)
      .get("/jobs/1")
      .set("Authorization", `Bearer ${access_token}`);
    expect(response.statusCode).toEqual(200);
    // console.log(response.body, "<<<<<<");
    expect(response.body).toHaveProperty("data", expect.any(Object));
    expect(response.body).toHaveProperty("message", "Job found successfully");
  });
  it("Gagal mendapatkan data job - (belum login)", async () => {
    const response = await request(app).get("/jobs/1");
    expect(response.statusCode).toEqual(401);
    expect(response.body).toHaveProperty("errors", expect.any(Object));
  });
  it("Gagal mendapatkan data job - (token tidak valid)", async () => {
    const response = await request(app)
      .get("/jobs/1")
      .set("Authorization", `Bearer sdasfasf`);
    expect(response.statusCode).toEqual(401);
    expect(response.body).toHaveProperty("errors", expect.any(Array));
  });
  it("Gagal mendapatkan data job - (id tidak valid)", async () => {
    const response = await request(app)
      .get("/jobs/100")
      .set("Authorization", `Bearer ${access_token}`);
    expect(response.statusCode).toEqual(404);
    expect(response.body).toHaveProperty("errors", expect.any(Array));
  });
});

// PUT /jobs/:id
describe("PUT /jobs/:id", () => {
  it("berhasil mengupdate data job - (Admin)", async () => {
    const body = {
      title: "Backend Developer",
      description: "Membuat aplikasi backend",
      imgUrl: "https://www.google.com",
      jobType: "full time",
      companyId: 1,
    };
    const response = await request(app)
      .put("/jobs/1")
      .send(body)
      .set("Authorization", `Bearer ${access_token}`);
    expect(response.statusCode).toEqual(200);
    expect(response.body).toHaveProperty("message", "Job updated successfully");
    expect(response.body).toHaveProperty("data", expect.any(Object));
  });
  it("Gagal mengupdate data job - (belum login)", async () => {
    const body = {
      title: "Backend Developer",
      description: "Membuat aplikasi backend",
      imgUrl: "https://www.google.com",
      jobType: "full time",
      companyId: 1,
    };
    const response = await request(app).put("/jobs/1").send(body);
    expect(response.statusCode).toEqual(401);
    expect(response.body).toHaveProperty("errors", expect.any(Object));
  });
  it("Gagal mengupdate data job - (token tidak valid)", async () => {
    const body = {
      title: "Backend Developer",
      description: "Membuat aplikasi backend",
      imgUrl: "https://www.google.com",
      jobType: "full time",
      companyId: 1,
    };
    const response = await request(app)
      .put("/jobs/1")
      .send(body)
      .set("Authorization", `Bearer sdasfasf`);
    expect(response.statusCode).toEqual(401);
    expect(response.body).toHaveProperty("errors", expect.any(Array));
  });
  it("Gagal mengupdate data job - (id entity tidak valid)", async () => {
    const body = {
      title: "Backend Developer",
      description: "Membuat aplikasi backend",
      imgUrl: "https://www.google.com",
      jobType: "full time",
      companyId: 1,
    };
    const response = await request(app)
      .put("/jobs/100")
      .send(body)
      .set("Authorization", `Bearer ${access_token}`);
    expect(response.statusCode).toEqual(404);
    // console.log(response.body, "<<<<<");
    expect(response.body).toHaveProperty("errors", expect.any(Array));
  });
  it("Gagal mengupdate data job - (Staff mengolah data entity yang bukan miliknya)", async () => {
    const body = {
      title: "Backend Developer",
      description: "Membuat aplikasi backend",
      imgUrl: "https://www.google.com",
      jobType: "full time",
      companyId: 1,
    };
    const response = await request(app)
      .put("/jobs/1")
      .send(body)
      .set("Authorization", `Bearer ${access_token2}`);
    // console.log(response.body, "<<<<<<");
    expect(response.statusCode).toEqual(401);
    expect(response.body).toHaveProperty("errors", expect.any(Object));
  });
  it("Gagal mengupdate data job - (Gagal ketika request body yang diberikan tidak sesuai dengan validasi)", async () => {
    const body = {
      title: "",
      description: "",
      imgUrl: "",
      jobType: "",
      companyId: "",
    };
    const response = await request(app)
      .put("/jobs/1")
      .send(body)
      .set("Authorization", `Bearer ${access_token}`);
    expect(response.statusCode).toEqual(400);
    expect(response.body).toHaveProperty("errors", expect.any(Array));
  });
});

// DELETE /jobs/:id
describe("DELETE /jobs/:id", () => {
  it("berhasil menghapus data job - (Admin)", async () => {
    const response = await request(app)
      .delete("/jobs/2")
      .set("Authorization", `Bearer ${access_token}`);
    expect(response.statusCode).toEqual(200);
    // console.log(response.body, "<<<<<<");
    expect(response.body).toHaveProperty("message", "Job deleted successfully");
  });
  it("Gagal menghapus data job - (belum login)", async () => {
    const response = await request(app).delete("/jobs/1");
    expect(response.statusCode).toEqual(401);
    expect(response.body).toHaveProperty("errors", expect.any(Object));
  });
  it("Gagal menghapus data job - (token tidak valid)", async () => {
    const response = await request(app)
      .delete("/jobs/1")
      .set("Authorization", `Bearer sdasfasf`);
    expect(response.statusCode).toEqual(401);
    expect(response.body).toHaveProperty("errors", expect.any(Array));
  });
  it("Gagal menghapus data job - (id entity tidak valid)", async () => {
    const response = await request(app)
      .delete("/jobs/100")
      .set("Authorization", `Bearer ${access_token}`);
    expect(response.statusCode).toEqual(404);
    expect(response.body).toHaveProperty("errors", expect.any(Array));
  });
  it("Gagal menghapus data job - (Staff menghapus data entity yang bukan miliknya)", async () => {
    const response = await request(app)
      .delete("/jobs/1")
      .set("Authorization", `Bearer ${access_token2}`);
    expect(response.statusCode).toEqual(401);
    expect(response.body).toHaveProperty("errors", expect.any(Object));
  });
});

// PATCH /jobs/:id
describe("PATCH /jobs/:id", () => {
  it("berhasil mengupdate imgUrl job - (Admin)", async () => {
    const body = {
      imgUrl: "https://www.google.com",
    };
    const response = await request(app)
      .patch("/jobs/1")
      .attach("file", "./public/watermelon.jpg")
      .set("Authorization", `Bearer ${access_token}`);
    expect(response.statusCode).toEqual(200);
    expect(response.body).toHaveProperty(
      "message",
      "Image updated successfully"
    );
    expect(response.body).toHaveProperty("data", expect.any(Object));
  });
  it("Gagal mengupdate imgUrl job - (belum login)", async () => {
    const body = {
      imgUrl: "https://www.google.com",
    };
    const response = await request(app)
      .patch("/jobs/1")
      .attach("file", "./public/watermelon.jpg");
    expect(response.statusCode).toEqual(401);
    expect(response.body).toHaveProperty("errors", expect.any(Object));
  });
  it("Gagal mengupdate imgUrl job - (token tidak valid)", async () => {
    const body = {
      imgUrl: "https://www.google.com",
    };
    const response = await request(app)
      .patch("/jobs/1")
      .attach("file", "./public/watermelon.jpg")
      .set("Authorization", `Bearer sdasfasf`);
    expect(response.statusCode).toEqual(401);
    expect(response.body).toHaveProperty("errors", expect.any(Array));
  });
  it("Gagal mengupdate imgUrl job - (id entity tidak valid)", async () => {
    const body = {
      imgUrl: "https://www.google.com",
    };
    const response = await request(app)
      .patch("/jobs/100")
      .attach("file", "./public/watermelon.jpg")
      .set("Authorization", `Bearer ${access_token}`);
    expect(response.statusCode).toEqual(404);
    expect(response.body).toHaveProperty("errors", expect.any(Array));
  });
  it("Gagal mengupdate imgUrl job - (Staff mengupdate data entity yang bukan miliknya)", async () => {
    const body = {
      imgUrl: "https://www.google.com",
    };
    const response = await request(app)
      .patch("/jobs/3")
      .attach("file", fs, "watermelon.jpg")
      .set("Authorization", `Bearer ${access_token2}`);
    expect(response.statusCode).toEqual(401);
    // console.log(response.body, "<<<<<<");
    expect(response.body).toHaveProperty("errors", expect.any(Object));
  });
  it("Gagal mengupdate imgUrl job - (Gagal ketika request body yang diberikan tidak sesuai dengan validasi)", async () => {
    const body = {
      imageUrl: "",
    };
    const response = await request(app)
      .patch("/jobs/1")
      .attach("file", "")
      .set("Authorization", `Bearer ${access_token}`);
    console.log(response.body, "<<<<<<");
    expect(response.statusCode).toEqual(400);
    expect(response.body).toHaveProperty(
      "message",
      "Image file cannot be empty"
    );
  });
});

// GET /companies
describe("GET /companies", () => {
  it("berhasil mendapatkan data companies - (Admin)", async () => {
    const response = await request(app)
      .get("/companies")
      .set("Authorization", `Bearer ${access_token}`);
    expect(response.statusCode).toEqual(200);
    expect(response.body).toHaveProperty(
      "massage",
      "Companies found successfully"
    );
    expect(response.body).toHaveProperty("data", expect.any(Array));
  });
  it("Gagal mendapatkan data companies - (belum login)", async () => {
    const response = await request(app).get("/companies");
    expect(response.statusCode).toEqual(401);
    expect(response.body).toHaveProperty("errors", expect.any(Object));
  });
  it("Gagal mendapatkan data companies - (token tidak valid)", async () => {
    const response = await request(app)
      .get("/companies")
      .set("Authorization", `Bearer sdasfasf`);
    expect(response.statusCode).toEqual(401);
    expect(response.body).toHaveProperty("errors", expect.any(Array));
  });
});
