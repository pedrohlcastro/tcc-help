export default (sequelize, DataType) => {
  var Reply = sequelize.define(
    'Reply', {
      id: {
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      comment: {
        type: DataType.STRING(300),
        allowNull: false,
      },
      date: {
        type: DataType.DATE,
        allowNull: false,
      }
    },
    {
      timestamps: false,
      freezeTableName: true,
    },
  );
  Reply.associate = function (models) {
    models.Reply.belongsTo(models.User, { 
      as: 'ReplyUser',
      foreignKey: {
        name: 'user_id',
        allowNull: false,
      }
    });
    models.Reply.belongsTo(models.Topic, { 
      as: 'ReplyTopic',
      foreignKey: {
        name: 'topic_id',
        allowNull: false,
      }
    });
  };
  return Reply;
};
