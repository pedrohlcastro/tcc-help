export default (sequelize, DataType) => {
  const Comment = sequelize.define(
    'Comment', {
      id: {
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      message: {
        type: DataType.STRING(300),
        allowNull: false,
      },
      date: {
        type: DataType.DATE,
        allowNull: false,
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
    },
  );
  Comment.associate = (models) => {
    models.Comment.belongsTo(models.User, {
      as: 'CommentUser',
      foreignKey: {
        name: 'user_id',
        allowNull: false,
      },
    });
    models.Comment.belongsTo(models.Tcc, {
      as: 'CommentTcc',
      foreignKey: {
        name: 'tcc_id',
        allowNull: false,
      },
    });
  };
  return Comment;
};
