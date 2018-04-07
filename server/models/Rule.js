module.exports = (sequelize, DataType) => {
    var Rule = sequelize.define(
        'Rule', {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        regex: {
            type: DataType.STRING(20),
            allowNull: false,
        },
        message: {
            type: DataType.STRING(250),
            allowNull: false,
        }
        },
        {
        timestamps: false,
        freezeTableName: true,
        }
    );
    Rule.associate = function(models){
        models.Rule.belongsTo(models.User, {
            foreignKey: {
              allowNull: false
            }
          });
    };
    return Rule;
};