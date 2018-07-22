'use strict';
module.exports = (sequelize, DataTypes) => {
    let Meme = sequelize.define('Meme', {
        topText: DataTypes.STRING,
        bottomText: DataTypes.STRING,
        imageId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    });

    Meme.associate = (models) => {
        Meme.belongsTo(models.Image, {foreignKey: 'imageId', as: 'image'});
    };

    return Meme;
};
