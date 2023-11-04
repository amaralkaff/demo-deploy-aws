const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");
const routerJob = require("./jobs");
const routerCompany = require("./companies");
const routerPublic = require("./publics");
const authentication = require("../middlewares/authentication");
const userAuthorization = require("../middlewares/userAuthorization");
router.post("/login", UserController.login);

router.use(authentication);
router.post("/add-user", userAuthorization, UserController.addUser);

router.use("/jobs", routerJob);
router.use("/companies", routerCompany);
router.use("/pub", routerPublic);

module.exports = router;
