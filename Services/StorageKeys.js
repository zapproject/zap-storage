/*!
 * ZAP CLI
 * MIT Licensed
 */
const Storage = require('./Storage');

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
    this.modelName = 'keys';
  }


  /**
   * add new key to storage
   * @param  {TEXT}  network  network name
   * @param  {TEXT}  publick  publick key
   * @param  {TEXT}  privat  private key
   * @return {Promise}           [description]
   */
  async add(network, publick, privat) {
    // walidation of atrs
    if (!(network && publick && privat)) {
      throw console.error(`incorrect require params: pid=${network || '?'} accesskey=${publick || '?'} secretkey=${privat || '?'}`);
    }

    const result = await this.model.create({
      network,
      publick,
      privat,
    });

    result.dataValues.updatedAt = Storage.formatDate(result.dataValues.updatedAt);
    delete result.dataValues.createdAt;

    return result.dataValues;
  }


  /**
   * delete keys
   * @param  {INTEGER}    id   id of row
   * @param  {TEXT}  network  network name
   * @param  {TEXT}  publick  publick key
   * @param  {TEXT}  privat  private key
   * @return {Promise}  void
   */
  async del(id, network, publick, privat) {
    let where = '';

    if (id && id !== 'null') where = `${where} and id = ${id} `;
    if (network && network !== 'null') where = `${where} and network like "%${network}%" `;
    if (publick && publick !== 'null') where = `${where} and publick like "%${publick}%" `;
    if (privat && privat !== 'null') where = `${where} and privat = "${privat}" `;
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

    await this.provider.query(`DELETE FROM ${this.model.name} ${where}`);

    return result;
  }


  /**
   * read rows
   * @param  {INTEGER}    id   id of row
   * @param  {TEXT}  network  network name
   * @param  {TEXT}  publick  publick key
   * @param  {TEXT}  privat  private key
   * @return {Promise} {row}  rows of select
   */
  async read(id, network, publick, privat) {
    let where = '';

    if (id && id !== 'null') where = `${where} and id = ${id} `;
    if (network && network !== 'null') where = `${where} and network like "%${network}%" `;
    if (publick && publick !== 'null') where = `${where} and publick like "%${publick}%" `;
    if (privat && privat !== 'null') where = `${where} and privat = "${privat}" `;
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
