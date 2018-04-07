export default (sequelize, DataType) => {
    var StudentProfessor = sequelize.define(
      'StudentProfessor', {
        id: {
          type: DataType.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        accept: {
          type: DataType.TINYINT(2),
          allowNull: false,
        },
        activate: {
          type: DataType.TINYINT(1),
          allowNull: false,
        }
      },
      {
        timestamps: false,
        freezeTableName: true,
      },
    );
    StudentProfessor.associate = function (models) {
      models.StudentProfessor.hasMany(models.Tcc, {
        as: 'StudentProfessorTcc',
        foreignKey: {
          name: 'student_professor_id',
          allowNull: false,
        }
      });
      /*models.StudentProfessor.belongsToMany(models.User, {
        as: 'Student',
        through: 'StudentProfessor',
        foreignKey: {
          name: 'student_id',
          allowNull: false
        }
      });
      models.StudentProfessor.belongsToMany(models.User, {
        as: 'Professor',
        through: 'StudentProfessor',
        foreignKey: {
          name: 'professor_id',
          allowNull: false
        }
      });*/
    };
  return StudentProfessor;
};