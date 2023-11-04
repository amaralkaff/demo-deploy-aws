const express = require("express");
const router = express.Router();
const PublicController = require("../controllers/publicController");

// 10. Mengambil semua data entitas utama(GET) untuk public site
router.get("/jobs", PublicController.readJobsPublic);
// 11. Mengambil detail entitas utama berdasarkan ID(GET by id) untuk public site
router.get("/jobs/:id", PublicController.readJobByIdPublic);

module.exports = router;
