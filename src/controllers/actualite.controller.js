const db = require("../util/mysql.connect");

const Actualite = db.actualites;
const User = require("../models/User");

const useUtils = require("../util/functions");
const util = useUtils();

/* Auth check: ❎
 */
exports.getAllActualites = (_req, res) => {
  util.LogInfo(`Getting all actualites`);
  Actualite.findAll()
    .then((data) => res.status(200).json(data))
    .catch((error) => res.status(500).json({ error }));
};

/* Auth check: ❎
 */
exports.getLimitedActualites = async (req, res) => {
  util.LogInfo(
    `Getting limited actualites '${req.params.type}' '${req.params.limit}'`
  );

  if (isNaN(req.params.limit) || isNaN(req.params.type)) {
    return res.status(400).json({ error: "Limit must be a number" });
  }

  /* Type:
  0: all
  1: alertes
  2: simple
  3: future
  4: agility
  */
  if (parseInt(req.params.type) < 0 || parseInt(req.params.type > 4)) {
    return res.status(400).json({ error: "Type must be between 0 and 4" });
  }

  let indexes = [];
  if (parseInt(req.params.type) !== 0) {
    await Actualite.findAll({
      where: { actType: req.params.type },
      order: [["actId", "DESC"]],
    })
      .then((data) => {
        let actualites = [];
        data.forEach((act) => {
          actualites.push(act.actId);
        });
        indexes = actualites.slice(
          parseInt(req.params.limit) * 5,
          parseInt(req.params.limit) * 5 + 5
        );
      })
      .catch((error) => res.status(500).json({ error }));
  } else {
    let index = [(await Actualite.count()) - parseInt(req.params.limit) * 5]; // get the index of the first actualite
    for (let i = 1; i < 5; i++) {
      indexes.push(index[0] + i); // get the index of the next 4 actualites
    }
  }

  Actualite.findAll({
    where: { actId: indexes },
    order: [["actId", "DESC"]],
  })
    .then((data) => {
      if (data.length === 0) {
        return res.status(404).json({ error: "No actualites found" });
      }
      data.forEach((act) => {
        act.actCachee = act.actCachee === 1 ? true : false;
        act.actDesactive = act.actDesactive === 1 ? true : false;
      });
      res.status(200).json(data);
    })
    .catch((error) => res.status(500).json({ error }));
};

/* Auth check: ❎
 */
exports.getOneActualite = (req, res) => {
  util.LogInfo(`Getting actualite '${req.params.id}'`);
  const id = req.params.id;
  Actualite.findOne({ where: { actId: id } })
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
    Actualite.create(act)
      .then((data) => {
        res.status(200).json(data);

        // Add the actualite to the user's actIds
        User.findOne({ _id: req.auth.userId })
          .then((user) => {
            user.actIds.push(data.actId.toString());
            user.save();
          })
          .catch((error) => res.status(404).json({ error }));
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
      if (req.auth.role !== "admin" && !user.actIds.includes(req.params.id)) {
        res.status(401).json({ error: "Unauthorized" });
      } else {
        util.LogWarn(`Deleting actualite '${req.params.id}'`);
        Actualite.destroy({
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
      if (req.auth.role !== "admin" && !user.actIds.includes(req.params.id)) {
        res.status(401).json({ error: "Unauthorized" });
      } else {
        util.LogInfo(`Updating actualite '${req.params.id}'`);
        const actuObj = { ...req.body };

        Actualite.update(
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
