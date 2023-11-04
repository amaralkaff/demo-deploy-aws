const express = require("express");
const router = express.Router();
const CompanyController = require("../controllers/companyController");
const authorization = require("../middlewares/authorization");

// 6. Membuat entitas support(POST)
router.post("/", CompanyController.createCompany);
// 7. Mengambil semua data entitas support Genre / Category / Type(GET)
router.get("/", CompanyController.readCompanies);
// 8. Mengupdate data entitas support(PUT by id)
router.put("/:id", authorization, CompanyController.updateCompany);
// 9. Menghapus data entitas support(DELETE by id)
router.delete("/:id", authorization, CompanyController.deleteCompany);

module.exports = router;
