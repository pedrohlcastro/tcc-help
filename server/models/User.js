module.exports = (sequelize, DataType) => {
  var User = sequelize.define(
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
      profile_image_path: {
        type: DataType.STRING(45),
        allowNull: false,
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
    },
  );
  User.associate = function(models){
    models.User.hasMany(models.Rule);
  };
  return User;
};
