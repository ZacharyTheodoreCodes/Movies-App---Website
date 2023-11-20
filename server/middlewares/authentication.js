const { User } = require("../models");
const { verifyToken } = require("../helpers/jwt");

const authentication = async (req, res, next) => {
  try {
    const { access_token } = req.headers;
    if (!access_token) throw { name: "InvalidToken" };

    const payload = verifyToken(access_token);
    if (!payload) throw { name: "InvalidToken" };

    const user = await User.findByPk(payload.id);
    if (!user) throw { name: "InvalidAccount" };

    req.user = {
      id: user.id,
      role: user.role,
      email: user.email,
    };

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authentication;
