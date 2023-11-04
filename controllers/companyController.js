const { Company, Job } = require("../models");

class CompanyController {
  static async createCompany(req, res, next) {
    try {
      const { name, companyLogo, location, email, description } = req.body;
      const newCompany = await Company.create({
        name,
        companyLogo,
        location,
        email,
        description,
      });
      res.status(201).json({
        message: "Company created successfully",
        data: newCompany,
      });
    } catch (err) {
      next(err);
    }
  }

  static async readCompanies(req, res) {
    try {
      const companies = await Company.findAll({
        include: {
          model: Job,
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });
      res.status(200).json({
        massage: "Companies found successfully",
        data: companies,
      });
    } catch (err) {
      next(err);
    }
  }

  static async updateCompany(req, res, next) {
    try {
      const { id } = req.params;
      const { name, companyLogo, location, email, description } = req.body;
      const company = await Company.findByPk(id);

      if (!company) {
        throw new Error("Company not found");
      }

      const updatedCompany = await Company.update(
        {
          name,
          companyLogo,
          location,
          email,
          description,
        },
        {
          where: { id },
          returning: true,
        }
      );

      res.status(200).json({
        message: `Company with id ${id} updated successfully`,
        data: updatedCompany,
      });
    } catch (err) {
      next(err);
    }
  }

  static async deleteCompany(req, res, next) {
    try {
      const { id } = req.params;
      const company = await Company.findByPk(id);

      if (!company) {
        throw new Error("Company not found");
      }

      if (!id) {
        throw new Error("Company id cannot be empty");
      }

      await Company.destroy({ where: { id } });

      res.status(200).json({ message: "Company deleted successfully" });
    } catch (err) {
      // console.log(err);
      next(err);
    }
  }
}

module.exports = CompanyController;
