const db = require("../util/mysql.connect");

const Actualites = db.actualites;
const User = require("../models/User");

const useUtils = require("../util/functions");
const util = useUtils();

/* Auth check: ❎
 */
exports.getActualites = (req, res) => {
  util.LogInfo(`Getting all actualites`);
  Actualites.findAll()
    .then((data) => res.status(200).json(data))
    .catch((error) => res.status(500).json({ error }));
};

/* Auth check: ❎
 */
exports.getOneActualite = (req, res) => {
  util.LogInfo(`Getting actualite '${req.params.id}'`);
  const id = req.params.id;
  Actualites.findOne({ where: { actId: id } })
    .then((data) => res.status(200).json(data))
    .catch((error) => res.status(404).json({ error }));
};

/* Auth check: 
Guest: ❎
Member: ✅
Admin: ✅
  */
exports.createActualite = (req, res) => {
  if (req.auth.role !== "admin" && req.auth.role !== "member") {
    res.status(401).json({ error: "Unauthorized" });
  } else {
    util.LogInfo(`Creating actualite`);
    let actDateDebut = util.DateFromUnix(req.body.actDateDebut);

    //TODO: Handle other dates (actDateFin, actDateCreation, actDateModification)

    const act = {
      actTitre: req.body.actTitre,
      actTexte: req.body.actTexte,
      actType: req.body.actType,
      actDateDebut: actDateDebut,
      actDateFin: req.body.actDateFin,
      actCachee: req.body.actCachee,
      actDateCachee: req.body.actDateCachee,
      actDesactive: req.body.actDesactive,
    };
    Actualites.create(act)
      .then((data) => {
        res.status(200).json(data);

        // Add the actualite to the user's actualitesIds
        User.findOne({ _id: req.auth.userId }).then((user) => {
          user.actualitesIds.push(data.actId.toString());
          user.save();
        });
      })
      .catch((error) => res.status(500).json({ error }));
  }
};

/* Auth check:
Guest: ❎
Member: ✅ must be the author
Admin: ✅
  */
exports.deleteActualite = (req, res) => {
  if (req.auth.role !== "admin" && req.auth.role !== "member") {
    res.status(401).json({ error: "Unauthorized" });
  }

  // Get the user and check if he is the author of the actualite
  User.findOne({ _id: req.auth.userId })
    .then((user) => {
      if (
        req.auth.role !== "admin" &&
        !user.actualitesIds.includes(req.params.id)
      ) {
        res.status(401).json({ error: "Unauthorized" });
      } else {
        util.LogWarn(`Deleting actualite '${req.params.id}'`);
        Actualites.destroy({
          where: {
            actId: req.params.id,
          },
        })
          .then(() => res.status(200).json({ message: "Actualite deleted!" }))
          .catch((error) => res.status(400).json({ error }));
      }
    })
    .catch((error) => res.status(404).json({ error }));
};

/* Auth check:
Guest: ❎
Member: ✅ must be the author
Admin: ✅
  */
exports.updateActualite = (req, res) => {
  if (req.auth.role !== "admin" && req.auth.role !== "member") {
    res.status(401).json({ error: "Unauthorized" });
  }

  // Get the user and check if he is the author of the actualite
  User.findOne({ _id: req.auth.userId })
    .then((user) => {
      if (
        req.auth.role !== "admin" &&
        !user.actualitesIds.includes(req.params.id)
      ) {
        res.status(401).json({ error: "Unauthorized" });
      } else {
        util.LogInfo(`Updating actualite '${req.params.id}'`);
        const actuObj = { ...req.body };

        Actualites.update(
          { ...actuObj },
          {
            where: {
              actId: req.params.id,
            },
          }
        )
          .then(() => res.status(200).json({ message: "Actualite updated!" }))
          .catch((error) => res.status(400).json({ error }));
      }
    })
    .catch((error) => res.status(404).json({ error }));
};
