const authorization = async (req, res, next) => {
  try {
    const { id } = req.loginInfo;
    // console.log(req.loginInfo, "<<<<<<");

    if (req.loginInfo.role !== "admin") {
      throw new Error("Unauthorized");
    }
    next();
  } catch (error) {
    // console.log(error.message);
    next(error);
  }
};

module.exports = authorization;
