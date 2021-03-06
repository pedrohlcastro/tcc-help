import Sequelize from 'sequelize';
import fs from 'fs';
import path from 'path';

import config from './config.json';

let db = null;

// Create Tables, based on models folder
const createModels = (sequelize) => {
  const importedModels = [];
  const modelsDir = path.join(__dirname, '../models');
  fs.readdirSync(modelsDir).forEach((modelFile) => {
    const modelFilePath = path.join(modelsDir, modelFile);
    const newModel = sequelize.import(modelFilePath);

    importedModels[newModel.name] = newModel;
  });
  return importedModels;
};


export default () => {
  let sequelize;
  if (!db) {
    if (process.env.NODE_ENV !== 'production') {
      sequelize = new Sequelize(
        config.db,
        config.db_user,
        config.db_password,
        {
          host: 'mysql',
          dialect: 'mysql',
          operatorsAliases: false,
          query: true,
          logging: false,
          pool: {
            maxConnections: 100,
            minConnections: 1,
            maxIdleTime: 3600000000,
          },
        },
      );
    } else {
      sequelize = new Sequelize(
        config.db_name,
        config.db_user_prod,
        config.db_pass_prod,
        {
          host: config.db_url_prod,
          dialect: 'mysql',
          operatorsAliases: false,
          query: true,
          logging: false,
          pool: {
            maxConnections: 100,
            minConnections: 1,
            maxIdleTime: 3600000000,
          },
        },
      );
    }


    db = {
      sequelize,
      Sequelize,
      models: {},
    };

    db.models = createModels(sequelize);

    Object.keys(db.models).forEach((modelName) => {
      if (db.models[modelName].associate) {
        db.models[modelName].associate(db.models);
      }
    });

    sequelize.sync().done(() => db);
  }
  return db;
};
