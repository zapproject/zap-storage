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


  /**
   * add new key to storage
   * @param  {INTEGER}  pid       process id
   * @param  {TEXT}  accesskey  access token
   * @param  {TEXT}  secretkey  secret key
   * @return {Promise}           [description]
   */
  async add(pid, accesskey, secretkey) {
    // walidation of atrs
    if (!(pid && accesskey && secretkey)) {
      throw console.error(`incorrect require params: pid=${pid || '?'} accesskey=${accesskey || '?'} secretkey=${secretkey || '?'}`);
    }
    if (typeof pid !== 'number') {
      throw console.error(`incorrect type params: pid="${pid}" must be number'} secretkey=${secretkey || '?'}`);
    }

    const result = await this.model.create({
      pid,
      accesskey,
      secretkey,
    });

    result.dataValues.updatedAt = Storage.formatDate(result.dataValues.updatedAt);
    delete result.dataValues.createdAt;

    return result.dataValues;
  }


  /**
   * delete keys
   * @param  {INTEGER}    id   id of row
   * @param  {INTEGER}    pid  provider id
   * @param  {TEXT} accesskey token of access
   * @param  {TEXT} secretkey key
   * @return {Promise} {row}  rows of select
   */
  async del(id, pid, accesskey, secretkey) {
    let where = '';

    if (id && id !== 'null') where = `${where} and id = ${id} `;
    if (pid && pid !== 'null') where = `${where} and pid = ${pid} `;
    if (accesskey && accesskey !== 'null') where = `${where} and accesskey like "%${accesskey}%" `;
    if (secretkey && secretkey !== 'null') where = `${where} and secretkey = "${secretkey}" `;
    if (where !== '') where = ` WHERE 1 = 1 ${where}`;

    const result = await this.provider
      .query(`DELETE FROM ${this.model.name} ${where}`);
    return result[0];
  }


  /**
   * read rows
   * @param  {INTEGER}    id   id of row
   * @param  {INTEGER}    pid  provider id
   * @param  {TEXT} accesskey token of access
   * @param  {TEXT} secretkey key
   * @return {Promise} {row}  rows of select
   */
  async read(id, pid, accesskey, secretkey) {
    let where = '';

    if (id && id !== 'null') where = `${where} and id = ${id} `;
    if (pid && pid !== 'null') where = `${where} and pid = ${pid} `;
    if (accesskey && accesskey !== 'null') where = `${where} and accesskey like "%${accesskey}%" `;
    if (secretkey && secretkey !== 'null') where = `${where} and secretkey = "${secretkey}" `;
    if (where !== '') where = ` WHERE 1 = 1 ${where}`;

    const result = [];

    await this.provider
      .query(`SELECT * FROM ${this.model.name} ${where}`)
      .then((rows) => {
        rows[0].forEach((row) => {
          const tmp = row;
          tmp.updatedAt = Storage.formatDate(tmp.updatedAt);
          delete tmp.createdAt;
          result.push(tmp);
        });
      });

    return result;
  }
};

module.exports = Storage;
