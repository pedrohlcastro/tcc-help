export default (sequelize, DataType) => {
  const Topic = sequelize.define(
    'Topic', {
      id: {
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataType.STRING(50),
        allowNull: false,
      },
      comment: {
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
  Topic.associate = function (models) {
    models.Topic.belongsTo(models.User, {
      as: 'TopicUser',
      foreignKey: {
        name: 'user_id',
        allowNull: false,
      },
    });
    models.Topic.hasMany(models.Reply, {
      as: 'TopicReply',
      foreignKey: {
        name: 'topic_id',
        allowNull: false,
      },
    });
  };
  return Topic;
};
