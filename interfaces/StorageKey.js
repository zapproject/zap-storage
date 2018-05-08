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
   */
  constructor(dbpath) {
    this.dbpath = dbpath;
  }

  static formatDate(date) {
    return dateFormat(date, 'yyyy-mm-dd hh:mm:ss');
  }

  /**
   * init init objects
   * @param {String} dbpath path of local db
   * @return {Promise}        return samself
   */
  async init(dbpath) {
    await driver(this.dbpath || dbpath).then((models) => {
      this.models = models;
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

    const result = await this.models.notary_cred.create({
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

    const result = await this.models.provider
      .query(`DELETE FROM ${this.models.notary_cred.name} ${where}`);
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

    await this.models.provider
      .query(`SELECT * FROM ${this.models.notary_cred.name} ${where}`)
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
