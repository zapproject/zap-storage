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
      throw console.error(`incorrect type params: pid="${pid}" must be number`);
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
   * @return {Promise}  void
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

module.exports = StorageNotary;
