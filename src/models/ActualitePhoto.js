module.exports = (sequelize, Sequelize) => {
    const ActualitePhoto = sequelize.define(
        `tblactualitesphotos`,
        {
            actphoId: {
                type: Sequelize.INTEGER(11),
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            actphoFichier: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            actphoCommentaire: {
                type: Sequelize.STRING(200),
                allowNull: false,
            },
            actId: {
                type: Sequelize.INTEGER(11),
                allowNull: false,
            }
        },
        {
            timestamps: false
        }
    );

    return ActualitePhoto;
}