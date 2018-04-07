export default (sequelize, DataType) => {
  const CheckRule = sequelize.define(
    'CheckRule', {
      id: {
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      word: {
        type: DataType.STRING(20),
        allowNull: false,
      },
      accept: {
        type: DataType.TINYINT(1),
        allowNull: false,
      },
      page: {
        type: DataType.INTEGER,
        allowNull: false,
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
    },
  );
  CheckRule.associate = function (models) {
    models.CheckRule.belongsTo(models.Rule, {
      as: 'CheckRuleRule',
      foreignKey: {
        name: 'rule_id',
        allowNull: false,
      },
    });
    models.CheckRule.belongsTo(models.Tcc, {
      as: 'CheckRuleTcc',
      foreignKey: {
        name: 'tcc_id',
        allowNull: false,
      },
    });
  };
  return CheckRule;
};
