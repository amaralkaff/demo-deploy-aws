const express = require("express");
const router = express.Router();
const JobController = require("../controllers/jobController");
const authorization = require("../middlewares/authorization");
const middlewareUpload = require("../middlewares/multer");

// 1. Membuat entitas utama(POST)
router.post("/", JobController.createJob);
// 2. Mengambil semua data entitas utama(GET)
router.get("/", JobController.readJobs);
// 3. Mengambil detail entitas utama berdasarkan ID(GET by id)
router.get("/:id", JobController.readJobById);
// Meng-update data imgurl entitas utama (Update / PATCH)
router.patch(
  "/:id",
  authorization,
  middlewareUpload,
  JobController.updateImgUrl
);
// 4. Mengupdate data entitas utama(PUT by id)
router.put("/:id", authorization, JobController.updateJob);
// 5. Menghapus data entitas utama(DELETE by id)
router.delete("/:id", authorization, JobController.deleteJob);

module.exports = router;
