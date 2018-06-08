export default (sequelize, DataType) => {
  const StudentProfessor = sequelize.define(
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
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
    },
  );
  StudentProfessor.associate = (models) => {
    models.StudentProfessor.hasMany(models.Tcc, {
      as: 'StudentProfessorTcc',
      foreignKey: {
        name: 'student_professor_id',
        allowNull: false,
      },
    });
  };
  return StudentProfessor;
};
