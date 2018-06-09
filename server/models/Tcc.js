export default (sequelize, DataType) => {
  const Tcc = sequelize.define(
    'Tcc', {
      id: {
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      file_path: {
        type: DataType.STRING(45),
        allowNull: false,
      },
      version: {
        type: DataType.INTEGER,
        allowNull: false,
      },
      visible_professor: {
        type: DataType.TINYINT(1),
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
  Tcc.associate = (models) => {
    models.Tcc.belongsTo(models.StudentProfessor, {
      as: 'TccStudentProfessor',
      foreignKey: {
        name: 'student_professor_id',
        allowNull: false,
      },
    });
    models.Tcc.hasMany(models.CheckRule, {
      as: 'TccCheckRule',
      foreignKey: {
        name: 'tcc_id',
        allowNull: false,
      },
    });
    models.Tcc.hasMany(models.Comment, {
      as: 'TccComment',
      foreignKey: {
        name: 'tcc_id',
        allowNull: false,
      },
    });
    models.Tcc.hasMany(models.CheckSpelling, {
      as: 'TccCheckSpelling',
      foreignKey: {
        name: 'tcc_id',
        allowNull: false,
      },
    });
  };
  return Tcc;
};
