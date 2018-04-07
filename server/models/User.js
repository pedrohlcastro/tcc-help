export default (sequelize, DataType) => {
  const User = sequelize.define(
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
  User.associate = (models) => {
    models.User.hasMany(models.Rule, {
      as: 'UserRule',
      foreignKey: {
        name: 'professor_id',
        allowNull: false,
      },
    });
    models.User.belongsToMany(models.User, {
      as: 'UserStudent',
      through: 'StudentProfessor',
      foreignKey: {
        name: 'student_id',
        allowNull: false,
      },
    });
    models.User.belongsToMany(models.User, {
      as: 'UserProfessor',
      through: 'StudentProfessor',
      foreignKey: {
        name: 'professor_id',
        allowNull: false,
      },
    });
    models.User.hasMany(models.Reply, {
      as: 'UserReply',
      foreignKey: {
        name: 'user_id',
        allowNull: false,
      },
    });
    models.User.hasMany(models.Topic, {
      as: 'UserTopic',
      foreignKey: {
        name: 'user_id',
        allowNull: false,
      },
    });
    models.User.hasMany(models.Comment, {
      as: 'UserComment',
      foreignKey: {
        name: 'user_id',
        allowNull: false,
      },
    });
  };
  return User;
};
