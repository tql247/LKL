const jwt = require("jsonwebtoken");
const { User } = require("@models/user");
const { Token } = require("@models/token");

const auth = async (req, res, next) => {
  if (!req.headers.authorization) {
    const err = new Error("No credentials sent");
    err.status = 401;
    return next(err);
  }

  try {
    const token = req.header("Authorization");
    const data = jwt.verify(token, process.env.JWT_KEY);
    const user = await User.query().findById(data.id);

    if (!user) {
      const err = new Error("User not found");
      err.status = 401;
      return next(err);
    }

    const tk = await Token.query()
      .where("id", user.id)
      .where("token", token)
      .first();

    if (!tk) {
      const err = new Error("Token not found");
      err.status = 401;
      return next(err);
    }

    req.user = user;
    req.token = tk;

    return next();
  } catch (error) {
    return next(error);
  }
};

module.exports = auth;
