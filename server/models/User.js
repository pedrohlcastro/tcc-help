export default (sequelize, DataType) => sequelize.define(
  'User', {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataType.STRING(50),
      allowNull: false,
    },
    email: {
      type: DataType.STRING(50),
      allowNull: false,
    },
    password: {
      type: DataType.STRING(40),
      allowNull: false,
    },
    type: {
      type: DataType.TINYINT(2),
      allowNull: false,
    },
    validate_professor: {
      type: DataType.TINYINT(1),
      allowNull: false,
    },
    perfil_image: {
      type: DataType.STRING(45),
      allowNull: false,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  },
);
