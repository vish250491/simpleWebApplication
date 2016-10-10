module.exports = function(sequelize, DataTypes) {
    var user = sequelize.define('user', {
        username: DataTypes.STRING,
        password: DataTypes.STRING,
        email: DataTypes.STRING
    }, {
        classMethods: {
            associate: function(models) {
                user.hasMany(models.notes)
            }
        }
    });

    return user;
}