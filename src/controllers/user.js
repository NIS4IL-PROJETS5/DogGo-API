const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const useUtils = require("../util/functions");
const util = useUtils();

const User = require("../models/User");

exports.signup = (req, res, next) => {
  util.LogInfo(`Registering user '${req.body.email}'`);
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hash,
      });
      user
        .save()
        .then(() => res.status(201).json({ message: "User created!" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
exports.login = (req, res, next) => {
  util.LogInfo(`Logging in user '${req.body.email}'`);
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user === null) {
        return res.status(401).json({ error: "Email / Password not found" });
      } else {
        bcrypt
          .compare(req.body.password, user.password) // compare the password sent by the user with the password stored in the database
          .then((valid) => {
            if (!valid) {
              return res
                .status(401)
                .json({ error: "Email / Password not found" });
            }
            res.status(200).json({
              userId: user._id,
              role: user.role,
              token: jwt.sign(
                {
                  userId: user._id,
                  role: user.role,
                },
                process.env.JWT_SECRET,
                {
                  expiresIn: "24h",
                }
              ),
            });
          })
          .catch((error) => res.status(500).json({ error }));
      }
    })
    .catch((error) => res.status(500).json({ error }));
};
