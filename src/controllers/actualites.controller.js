const db = require("../util/mysql.connect");
const Actualites = db.actualites;

const useUtils = require("../util/functions");
const util = useUtils();

/* Auth check: ❎
 */
exports.findOne = (req, res) => {
  util.LogInfo(`Getting actualite '${req.params.id}'`);
  const id = req.params.id;
  Actualites.findOne({ where: { actId: id } })
    .then((data) => res.status(200).json(data))
    .catch((error) => res.status(404).json({ error }));
};

/* Auth check: ❎
 */
exports.findAll = (req, res) => {
  util.LogInfo(`Getting all actualites`);
  Actualites.findAll()
    .then((data) => res.status(200).json(data))
    .catch((error) => res.status(500).json({ error }));
};
