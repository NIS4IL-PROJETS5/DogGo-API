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

  util.LogInfo(`Creating contact`);
  const contact = {
    ...req.body,
  };
  Contact.create(contact)
    .then((data) => res.status(201).json(data))
    .catch((error) => res.status(500).json({ error }));
};
