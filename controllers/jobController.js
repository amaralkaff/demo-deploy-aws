const { Job, Company } = require("../models");
const imagekit = require("../API/imagekit");
const user = require("../models/user");

class JobController {
  static async createJob(req, res, next) {
    try {
      const { title, description, imgUrl, jobType, companyId, authorId } =
        req.body;

      // console.log(req.body);

      const newJob = await Job.create({
        title,
        description,
        imgUrl,
        jobType,
        companyId,
        authorId,
      });
      // console.log(newJob);
      res.status(201).json({
        message: "Job created successfully",
        data: newJob,
      });
    } catch (err) {
      // console.log(err);
      next(err);
    }
  }

  static async readJobs(req, res, next) {
    try {
      const jobs = await Job.findAll({
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
      res.status(200).json({
        massage: "Jobs found successfully",
        data: jobs,
      });
    } catch (err) {
      next(err);
    }
  }

  static async readJobById(req, res, next) {
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

  static async updateJob(req, res, next) {
    try {
      // console.log("masukk");
      const { id } = req.params;
      const { title, description, imgUrl, jobType, companyId, authorId } =
        req.body;
      const job = await Job.findByPk(id);
      // console.log("dapet jkob");
      if (!job) {
        throw new Error("Job not found");
      }

      const updatedJob = await Job.update(
        {
          title,
          description,
          imgUrl,
          jobType,
          companyId,
          authorId,
        },
        {
          where: { id },
          returning: true,
        }
      );
      console.log("job updated", updatedJob);
      res.status(200).json({
        message: "Job updated successfully",
        data: updatedJob[1][0],
      });
    } catch (err) {
      // console.log(err);
      next(err);
    }
  }

  static async deleteJob(req, res, next) {
    try {
      const { id } = req.params;
      const job = await Job.findByPk(id);

      if (!job) {
        throw new Error("Job not found");
      }

      await Job.destroy({ where: { id } });

      res.status(200).json({
        message: "Job deleted successfully",
        data: { id, title: job.title },
      });
    } catch (err) {
      next(err);
    }
  }

  static async updateImgUrl(req, res, next) {
    try {
      const { id } = req.params;
      const job = await Job.findByPk(id);
      // console.log(job, "<<<<<");
      if (!job) {
        throw new Error("Job not found");
      }

      if (!req.file) {
        throw new Error("Image file cannot be empty");
      }

      const buffer = req.file.buffer;
      const base64data = buffer.toString("base64");
      const image = await imagekit.upload({
        file: base64data,
        fileName: req.file.originalname,
      });
      console.log(image);

      if (!image) {
        throw new Error("Image not found");
      }

      // console.log(image);
      const imgUrl = image.url;
      // console.log(imgUrl);

      const updatedUser = await Job.update(
        {
          imgUrl,
        },
        {
          where: { id },
          returning: true,
        }
      );

      if (!updatedUser) {
        throw new Error("User not found");
      }
      // console.log(updatedUser);
      res.status(200).json({
        message: "Image updated successfully",
        data: updatedUser[1][0],
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = JobController;
