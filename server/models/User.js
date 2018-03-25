export default (sequelize, DataTypes) => {
    return sequelize.define('user', {
        name: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        email:{
            type: DataTypes.STRING(50),
            allowNull: false
        },
        password: {
            type: DataTypes.STRING(40),
            allowNull: false
        },
        type: {
            type: DataTypes.TINYINT(1),
            allowNull: false
        },
        professor: {
            type: DataTypes.TINYINT(1),
            allowNull: false
        }
    }, { timestamps: false });
};;