const { Op } = require("sequelize");
const { Job, Company } = require("../models");

class PublicController {
  static async readJobsPublic(req, res, next) {
    try {
      let { page, limit, search, sort, filter } = req.query;

      page = page ? +page : 1;
      limit = limit ? +limit : 10;
      let option = {
        limit: limit,
        offset: (page - 1) * limit,
      };

      if (search !== undefined || filter !== undefined || sort !== undefined) {
        option.where = {};
      }

      if (search) {
        option.where = {
          title: {
            [Op.iLike]: `%${search}%`,
          },
        };
      }

      if (filter) {
        option.where = {
          companyId: filter,
        };
      }

      if (sort === "asc") {
        option.order = [["createdAt", "ASC"]];
      } else if (sort === "desc") {
        option.order = [["createdAt", "DESC"]];
      }

      const Jobs = await Job.findAndCountAll(option);
      res.status(200).json({
        message: "Jobs found successfully",
        data: Jobs,
      });
    } catch (err) {
      next(err);
    }
  }

  static async readJobByIdPublic(req, res, next) {
    try {
      const { id } = req.params;
      const job = await Job.findByPk(id, {
        include: {
          model: Company,
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });

      if (!job) {
        throw new Error("Job not found");
      }

      res.status(200).json({
        message: "Job found successfully",
        data: job,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = PublicController;
