/*!
 * ZAP CLI
 * Copyright(c) 2018 Kudriavtsev Sergey @ smartum.pro
 * MIT Licensed
 */

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'production';
const appKey = process.env.APPKEY;
const config = require('./config/db.json')[env];

const fnWarning = () => {
  console.error('Please set APPKEY in .env and safe it!!!');
  process.exit(0);
};

const modelsPath = path.join(__dirname, 'models');
const db = {};
db.Sequelize = Sequelize;

/**
 * export init storage method
 * @param  {String} storage  - name of database
 * @return {Object}          - storage
 */
module.exports = async (storage) => {
  if (!db.sequelize) {
    // check app key
    if (!fs.existsSync(path.join(__dirname, '../.env'))) {
      fs.writeFile(path.join(__dirname, '../.env'), 'APPKEY=', (err) => {
        if (err) throw err;
        fnWarning();
      });
    }
    if (!appKey) fnWarning();

    config.storage = path.join(__dirname, '/../', (storage || config.storage));
    db.sequelize = await new Sequelize(config.database, config.username, appKey, config);


    // import all models
    fs
      .readdirSync(modelsPath)
      .filter(file => (file.indexOf('.') > 0))
      .forEach((file) => {
        const model = db.sequelize.import(path.join(modelsPath, file));
        db[model.name] = model;
      });

    // init link models
    Object.keys(db).forEach((modelName) => {
      if ('associate' in db[modelName]) {
        db[modelName].associate(db);
      }
    });

    // Sync Database
    await db.sequelize.sync().catch((err) => {
      console.log(err, 'Something went wrong with the Database Update!');
    });
  }

  db.provider = db.sequelize;
  return db;
};
