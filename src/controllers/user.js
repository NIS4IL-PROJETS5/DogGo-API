const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const useUtils = require("../util/functions");
const util = useUtils();

const User = require("../models/User");

/* Auth check:
Guest: ❎
Member: ❎
Admin: ✅
*/
exports.getUsers = (req, res, next) => {
  util.LogInfo(`Getting users`);
  if (req.auth.role !== "admin") {
    res.status(401).json({ error: "Unauthorized" });
  } else {
    User.find()
      .then((users) => res.status(200).json(users))
      .catch((error) => res.status(400).json({ error }));
  }
};

/* Auth check:
Guest: 👤 Only himself
Member: 👤 Only himself
Admin: 👥 Everyone
*/
exports.getUser = (req, res, next) => {
  util.LogInfo(`Getting user '${req.params.id}'`);
  if (req.auth.userId !== req.params.id && req.auth.role !== "admin") {
    res.status(401).json({ error: "Unauthorized" });
  } else {
    User.findOne({ _id: req.params.id })
      .then((user) => res.status(200).json(user))
      .catch((error) => res.status(404).json({ error }));
  }
};

/* Auth check: ❎
 */
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

/* Auth check: ❎
 */
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

/* Auth check: ❎
 */
exports.deleteUser = (req, res, next) => {
  util.LogWarn(`Deleting user '${req.params.id}'`);
  console.log("🚀 ~ exports.deleteUser ~ req.auth.role", req.auth.role);
  if (req.auth.role !== "admin" || req.auth.userId === req.params.id) {
    console.log("oui");
    res.status(401).json({ error: "Unauthorized" });
  } else {
    User.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: "User deleted!" }))
      .catch((error) => res.status(400).json({ error }));
  }
};

/* Auth check:
Guest: 👤 Only himself with no role change
Member: 👤 Only himself with no role change
Admin: 👥 Everyone
*/
exports.updateUser = (req, res, next) => {
  util.LogInfo(`Updating user '${req.params.id}'`);
  if (req.auth.userId !== req.params.id && req.auth.role !== "admin") {
    res.status(401).json({ error: "Unauthorized" });
  } else {
    const userObj = { ...req.body };
    delete userObj._userId;

    User.findOne({ _id: req.params.id })
      .then((user) => {
        // check if the user is trying to change his role with no admin rights
        if (
          req.body.role &&
          user.role !== req.body.role &&
          req.auth.role !== "admin"
        ) {
          res.status(401).json({ error: "Unauthorized" });
        } else {
          User.updateOne(
            { _id: req.params.id },
            { ...userObj, _id: req.params.id }
          )
            .then(() => res.status(200).json({ message: "User updated!" }))
            .catch((error) => res.status(400).json({ error }));
        }
      })
      .catch((error) => res.status(404).json({ error }));
  }
};
