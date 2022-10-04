module.exports = (sequelize, Sequelize) => {
  const Actualites = sequelize.define(
    "tblactualites",
    {
      actId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      actDateDebut: {
        type: Sequelize.DATE,
      },
      actDateFin: {
        type: Sequelize.DATE,
      },
      actTitre: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      actTexte: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      actCachee: {
        type: Sequelize.BOOLEAN,
      },
      actDateCachee: {
        type: Sequelize.DATE,
      },
      actDesactive: {
        type: Sequelize.BOOLEAN,
      },
      actType: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
  return Actualites;
};
