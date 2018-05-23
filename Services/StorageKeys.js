/*!
 * ZAP CLI
 * MIT Licensed
 */
const Storage = require('./Storage');

/**
 * Storage provider class of notary_cred entity
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
   * @param  {TEXT}  public  public key
   * @param  {TEXT}  privat  private key
   * @return {Promise}           [description]
   */
  async add(network, public, privat) {
    // walidation of atrs
    if (!(network && public && privat)) {
      throw console.error(`incorrect require params: pid=${network || '?'} accesskey=${public || '?'} secretkey=${privat || '?'}`);
    }

    const result = await this.model.create({
      network,
      public,
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
   * @param  {TEXT}  public  public key
   * @param  {TEXT}  privat  private key
   * @return {Promise}  void
   */
  async del(id, network, public, privat) {
    let where = '';

    if (id && id !== 'null') where = `${where} and id = ${id} `;
    if (network && network !== 'null') where = `${where} and network like "%${network}%" `;
    if (public && public !== 'null') where = `${where} and public like "%${public}%" `;
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
   * @param  {TEXT}  public  public key
   * @param  {TEXT}  privat  private key
   * @return {Promise} {row}  rows of select
   */
  async read(id, network, public, privat) {
    let where = '';

    if (id && id !== 'null') where = `${where} and id = ${id} `;
    if (network && network !== 'null') where = `${where} and network like "%${network}%" `;
    if (public && public !== 'null') where = `${where} and public like "%${public}%" `;
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
