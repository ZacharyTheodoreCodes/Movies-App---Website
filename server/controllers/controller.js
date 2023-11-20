const { User } = require("../models");
const { comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");

class Controller {
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email) throw { name: "EmailRequired" };
      if (!password) throw { name: "PasswordRequired" };

      const user = await User.findOne({ where: { email } });
      if (!user) throw { name: "InvalidLogin" };

      const isValidPassword = comparePassword(password, user.password);
      if (!isValidPassword) throw { name: "InvalidLogin" };
      else {
        const token = signToken({
          id: user.id,
          role: user.role,
          email: user.email,
        });

        res.status(200).json({
          access_token: token,
          id: user.id,
          role: user.role,
          email: user.email,
        });
      }
    } catch (error) {
      next(error);
    }
  }

  static async addAmin(req, res, next) {
    try {
      const { username, email, password, role, phoneNumber, address } =
        req.body;

      const created = await User.create({
        username,
        email,
        password,
        role,
        phoneNumber,
        address,
      });

      res.status(201).json({
        id: created.id,
        username: created.username,
        email: created.email,
        role: created.role,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
