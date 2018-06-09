export default (sequelize, DataType) => {
  const CheckSpelling = sequelize.define(
    'CheckSpelling', {
      id: {
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      word: {
        type: DataType.STRING(20),
        allowNull: false,
      },
      suggestions: {
        type: DataType.STRING(255),
        allowNull: true,
      },
      justification: {
        type: DataType.STRING(255),
        allowNull: true,
      },
      accept: {
        type: DataType.TINYINT(2),
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
  CheckSpelling.associate = (models) => {
    models.CheckSpelling.belongsTo(models.Tcc, {
      as: 'CheckSpellingTcc',
      foreignKey: {
        name: 'tcc_id',
        allowNull: false,
      },
    });
  };
  return CheckSpelling;
};
