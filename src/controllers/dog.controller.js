const useUtils = require("../util/functions");
const util = useUtils();

const Dog = require("../models/Dog");
const User = require("../models/User");

/* Auth check:
Guest: ❎
Member: ❎
Admin: ✅ 
*/
exports.getAllDogs = (req, res) => {
  util.LogInfo(`Getting all dogs`);
  if (req.auth.role !== "admin") {
    return res.status(401).json({ error: "Unauthorized" });
  }
  Dog.find()
    .then((dogs) => res.status(200).json(dogs))
    .catch((error) => res.status(400).json({ error }));
};

/* Auth check:
Guest: ❎
Member: ✅ its own dog
Admin: ✅
*/
exports.getOneDog = (req, res) => {
  util.LogInfo(`Getting dog '${req.params.id}'`);
  Dog.findOne({ _id: req.params.id })
    .then((dog) => {
      if (req.auth.userId !== dog.userId && req.auth.role !== "admin") {
        return res.status(401).json({ error: "Unauthorized" });
      }
      return res.status(200).json(dog);
    })
    .catch((error) => res.status(404).json({ error }));
};

/* Auth check:
Guest: ✅
Member: ✅
Admin: ✅
*/
exports.createDog = (req, res) => {
  util.LogInfo(`Creating dog '${req.body.name}'`);
  const dog = new Dog({
    ...req.body,
    userId: req.auth.userId,
  });

  dog
    .save()
    .then(() => {
      User.updateOne({ _id: req.auth.userId }, { $push: { dogIds: dog._id } })
        .then(() => {
          res.status(201).json({ message: "Dog created!" });
        })
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(400).json({ error }));
};
