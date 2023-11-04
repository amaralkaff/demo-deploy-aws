const { Job } = require("../models");
const authorization = async (req, res, next) => {
  try {
    const { id, role } = req.loginInfo;
    if (role !== "admin") {
      // console.log(req.loginInfo);
      const jobId = req.params.id;
      const userId = await Job.findByPk(jobId);
      // console.log(userId);
      if (userId.authorId !== id) {
        throw new Error("Unauthorized");
      }
    }
    next();
  } catch (error) {
    // console.log(error);
    next(error);
  }
};

module.exports = authorization;
