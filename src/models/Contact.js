module.exports = (sequelize, Sequelize) => {
  const Contact = sequelize.define(
    "tblcontacts",
    {
      conId: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      conDateContact: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      conDestinataire: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      conIdentite: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      conAge: {
        type: Sequelize.STRING(20),
        allowNull: false,
        defaultValue: "",
      },
      conMail: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      conTelephone: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      conDemande: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      conReponse: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      timestamps: false,
    }
  );
  return Contact;
};
