const { User } = require("../models");
const { comparePassword, hashPassword } = require("../helpers/bcrypt");
const { token } = require("../helpers/jwt");

class UserController {
  static async addUser(req, res, next) {
    try {
      const { email, password, phoneNumber, address, username } = req.body;
      const newUser = await User.create({
        email,
        password,
        phoneNumber,
        address,
        username,
      });

      if (password.length < 6) {
        throw new Error("Password must be at least 6 characters");
      }

      const isValidPassword = hashPassword(password, newUser.password);

      if (!isValidPassword) {
        throw new Error("Invalid password");
      }

      if (!email || !password) {
        throw new Error("password and email cannot be empty");
      }

      token({ id: newUser.id, email: newUser.email });

      res.status(201).json({ data: newUser });
    } catch (err) {
      next(err);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });
      // console.log(user);
      if (!email && !password) {
        throw new Error("Email and password are required");
      }
      if (!email) {
        throw new Error("Email is required");
      }

      if (!password) {
        throw new Error("Password is required");
      }

      if (!user) {
        throw new Error("Not Found email");
      }

      const isValidPassword = comparePassword(password, user.password);

      if (!isValidPassword) {
        throw new Error("Invalid password");
      }
      const access_token = token({
        id: user.id,
        email: user.email,
        role: user.role,
      });
      // console.log(user.role, ">>>>>>>>>>>>>>>>>");

      res.status(200).json({ access_token });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UserController;
