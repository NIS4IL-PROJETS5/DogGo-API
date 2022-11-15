const db = require("../util/mysql.connect");

const Contact = db.contacts;
const User = require("../models/User");

const useUtils = require("../util/functions");
const util = useUtils();

/* Auth check:
Guest: ❎
Member: ❎
Admin: ✅
  */
exports.getAllContacts = (req, res) => {
  if (req.auth.role !== "admin") {
    res.status(401).json({ error: "Unauthorized" });
  }

  util.LogInfo(`Getting all contacts`);
  Contact.findAll()
    .then((data) => res.status(200).json(data))
    .catch((error) => res.status(500).json({ error }));
};

/* Auth check:
Guest: ❎
Member: ❎
Admin: ✅
  */
exports.getOneContact = (req, res) => {
  if (req.auth.role !== "admin") {
    res.status(401).json({ error: "Unauthorized" });
  }

  util.LogInfo(`Getting contact with id ${req.params.id}`);
  Contact.findByPk(req.params.id)
    .then((data) => res.status(200).json(data))
    .catch((error) => res.status(500).json({ error }));
};

/* Auth check:
Guest: ❎
Member: ❎
Admin: ✅
  */
exports.createContact = (req, res) => {
  if (req.auth.role !== "admin") {
    res.status(401).json({ error: "Unauthorized" });
  }

  const sendTo = {
    1: "contact@joyeuxcabots.fr",
    2: "moniteurs@joyeuxcabots.fr",
    3: "webmaster@joyeuxcabots.fr",
  };

  if (sendTo[req.body.conDestinataire] === undefined) {
    return res.status(400).json({ error: "Invalid destinataire" });
  }

  let contact = {
    ...req.body,
    conDestinataire: sendTo[req.body.conDestinataire],
  };

  User.findOne({ _id: req.auth.userId })
    .then((user) => {
      if (user) {
        contact = {
          ...contact,
          conIdentite: user.name,
          conMail: user.email,
          conTelephone: user.phone,
        };
      }
      util.LogInfo(`Creating new contact`);
      Contact.create(contact)
        .then((data) => res.status(201).json(data))
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(404).json({ error }));
};
