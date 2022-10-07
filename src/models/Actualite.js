module.exports = (sequelize, Sequelize) => {
  const Actualite = sequelize.define(
    "tblactualites",
    {
      actId: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      actDateDebut: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      actDateFin: {
        type: Sequelize.DATE,
        defaultValue: null,
      },
      actTitre: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      actTexte: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      actCachee: {
        type: Sequelize.TINYINT(1),
        allowNull: false,
        defaultValue: 0,
      },
      actDateCachee: {
        type: Sequelize.DATE,
      },
      actDesactive: {
        type: Sequelize.TINYINT(1),
        allowNull: false,
      },
      actType: {
        type: Sequelize.TINYINT(3),
        allowNull: false,
        defaultValue: 2,
      },
    },
    {
      timestamps: false,
    }
  );
  return Actualite;
};
