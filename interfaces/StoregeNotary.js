/*!
 * ZAP CLI
 * MIT Licensed
 */
const Storage = require('./Storege');

/**
 * Storage provuder class of notary_cred entity
 * @type {calss} Storage
 */
const StorageNotary = class StorageNotary extends Storage {
  /**
   * constructor
   * @param {String} dbpath path of local db
   * @return {void}
   */
  constructor(dbpath) {
    super(dbpath);
    this.modelName = 'notary_cred';
  }
};

module.exports = StorageNotary;
