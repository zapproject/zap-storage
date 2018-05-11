/*!
 * ZAP CLI
 * MIT Licensed
 */
const driver = require('../db');
const dateFormat = require('dateformat');

/**
 * Storage provuder class of programm storage
 * @type {calss} Storage
 */
const Storage = class Storage {
  /**
   * constructor of Storage
   * @param {String} dbpath path of local db
   * @param {String} modelName path of local db
   */
  constructor(dbpath) {
    this.dbpath = dbpath;
  }

  static formatDate(date) {
    return dateFormat(date, 'yyyy-mm-dd hh:mm:ss');
  }

  /**
   * init init objects
   * @param {String} dbpath    path of local db
   * @param {String} modelName current model
   * @return {Promise}         return samself
   */
  async init(dbpath) {
    await driver(this.dbpath || dbpath).then((models) => {
      this.models = models;
      this.provider = this.models.provider;
      if (this.modelName) {
        this.model = this.models[this.modelName];
      }
    });

    return this;
  }
};

module.exports = Storage;
