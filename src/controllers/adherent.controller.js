const db = require("../util/mysql.connect");

const Adherent = db.adherents;
const User = require("../models/User");

const useUtils = require("../util/functions");
const util = useUtils();

/* Auth check: ❎
 */
exports.getAdherents = (req, res) => {
  util.LogInfo(`Getting all adherents`);
  Adherent.findAll()
    .then((data) => res.status(200).json(data))
    .catch((error) => res.status(500).json({ error }));
};

/* Auth check: ❎
 */
exports.getOneAdherent = (req, res) => {
  util.LogInfo(`Getting adherent '${req.params.id}'`);
  const id = req.params.id;
  Adherent.findOne({ where: { adhId: id } })
    .then((data) => res.status(200).json(data))
    .catch((error) => res.status(404).json({ error }));
};

/* Auth check:
Guest: ❎
Member: ❎
Admin: ✅
    */
exports.createAdherent = (req, res) => {
  if (req.auth.role !== "admin") {
    res.status(401).json({ error: "Unauthorized" });
  } else {
    util.LogInfo(`Creating adherent`);
    const adhObj = {
      adhNom: req.body.adhNom,
      adhPrenom: req.body.adhPrenom,
      adhMail: req.body.adhMail,
      adhChien: req.body.adhChien,
      adhRace: req.body.adhRace,
      adhClub: req.body.adhClub,
      adhChiot: req.body.adhChiot,
      adhEducation: req.body.adhEducation,
      adhAgility: req.body.adhAgility,
      adhSauvetage: req.body.adhSauvetage,
      adhObeissance: req.body.adhObeissance,
      adhRci: req.body.adhRci,
      adhPhoto: req.body.adhPhoto,
      adhCroquettes: req.body.adhCroquettes,
      adhDesactive: req.body.adhDesactive,
    };

    Adherent.create(adhObj)
      .then((data) => {
        res.status(200).json(data);

        // Update the user's adhId if not already set
        User.findOne({ _id: req.auth.userId })
          .then((user) => {
            if (!user.adhId || user.adhId !== data.adhId) {
              user.adhId = data.adhId;
              user.save();
            }
          })
          .catch((error) => res.status(404).json({ error }));
      })
      .catch((error) => res.status(500).json({ error }));
  }
};

/* Auth check:
Guest: ❎
Member: ❎
Admin: ✅
    */
exports.deleteAdherent = (req, res) => {};

/* Auth check:
Guest: ❎
Member: ❎
Admin: ✅
    */
exports.updateAdherent = (req, res) => {};
