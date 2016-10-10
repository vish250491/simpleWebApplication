module.exports = function(sequelize, DataTypes) {
    var notes = sequelize.define('notes', {
        subject: DataTypes.STRING,
        body: DataTypes.STRING,
        version: DataTypes.INTEGER,
        userId:{
            type: DataTypes.INTEGER,
            model: 'users',
            key: 'id' 
        }
    }, {
        classMethods: {
            associate: function(models) {
                notes.belongsTo(models.user, {
                    onDelete: "CASCADE",
                    foreignKey: {
                        allowNull: false
                    }})
            }
        }
    });

    return notes;
}