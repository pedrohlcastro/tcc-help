export default (sequelize, DataType) => {
  const Rule = sequelize.define(
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
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
    },
  );
  Rule.associate = (models) => {
    models.Rule.belongsTo(models.User, {
      as: 'RuleProfessor',
      foreignKey: {
        name: 'professor_id',
        allowNull: false,
      },
    });
    models.Rule.hasMany(models.CheckRule, {
      as: 'RuleCheckRule',
      foreignKey: {
        name: 'rule_id',
        allowNull: false,
      },
    });
  };
  return Rule;
};
