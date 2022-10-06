module.exports = (sequelize, Sequelize) => {
  const Adherent = sequelize.define(
    "tbladherents",
    {
      adhId: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      adhNom: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      adhPrenom: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      adhMail: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      adhChien: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      adhRace: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      adhClub: {
        type: Sequelize.TINYINT(1),
        allowNull: false,
        defaultValue: 0,
      },
      adhChiot: {
        type: Sequelize.TINYINT(1),
        allowNull: false,
        defaultValue: 0,
      },
      adhEducation: {
        type: Sequelize.TINYINT(1),
        allowNull: false,
        defaultValue: 0,
      },
      adhAgility: {
        type: Sequelize.TINYINT(1),
        allowNull: false,
        defaultValue: 0,
      },
      adhSauvetage: {
        type: Sequelize.TINYINT(1),
        allowNull: false,
        defaultValue: 0,
      },
      adhObeissance: {
        type: Sequelize.TINYINT(1),
        allowNull: false,
        defaultValue: 0,
      },
      adhRci: {
        type: Sequelize.TINYINT(1),
        allowNull: false,
        defaultValue: 0,
      },
      adhPhoto: {
        type: Sequelize.TINYINT(1),
        allowNull: false,
        defaultValue: 1,
      },
      adhCroquettes: {
        type: Sequelize.TINYINT(1),
        allowNull: false,
        defaultValue: 0,
      },
      adhDesactive: {
        type: Sequelize.TINYINT(1),
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      timestamps: false,
    }
  );
  return Adherent;
};
