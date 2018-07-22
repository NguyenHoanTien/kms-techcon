'use strict';
module.exports = (sequelize, DataTypes) => {
    let Image = sequelize.define('Image', {
        name: DataTypes.STRING,
    });

    Image.associate = (models) => {
        Image.hasMany(models.Meme, {foreignKey: 'id'});
    };

    return Image;
};
