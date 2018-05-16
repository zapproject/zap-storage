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
    this.modelName = 'subscriptions';
  }


  /**
   * add new subscription to storage
   * @param  {TEXT}  queryid         [description]
   * @param  {TEXT}  subscriber      [description]
   * @param  {TEXT}  query           [description]
   * @param  {TEXT}  endpoint        [description]
   * @param  {JSON}  endpointparams  [description]
   * @return {Promise}                 [description]
   */
  async add(queryid, subscriber, query, endpoint, endpointparams) {
    // walidation of atrs
    if (!(queryid && subscriber && query && endpoint)) {
      throw console.error(`incorrect require params: queryid=${queryid || '?'} subscriber=${subscriber || '?'} query=${query || '?'} endpoint=${endpoint || '?'}`);
    }

    const result = await this.model.create({
      queryid,
      subscriber,
      query,
      endpoint,
      endpointparams,
    });

    result.dataValues.updatedAt = Storage.formatDate(result.dataValues.updatedAt);
    delete result.dataValues.createdAt;

    return result.dataValues;
  }


  /**
   * delete subscriptions
   * @param  {INTEGER}    id        id of subscription
   * @param  {TEXT}  queryid        queryid of subscription
   * @param  {TEXT}  subscriber     subscriber of subscription
   * @param  {TEXT}  query          query of subscription
   * @param  {TEXT}  endpoint       endpoint of subscription
   * @return {Promise}              void
   */
  async del(id, queryid, subscriber, query, endpoint) {
    let where = '';

    if (id && id !== 'null') where = `${where} and id = ${id} `;
    if (queryid && queryid !== 'null') where = `${where} and queryid = "${queryid}" `;
    if (subscriber && subscriber !== 'null') where = `${where} and subscriber like "%${subscriber}%" `;
    if (query && query !== 'null') where = `${where} and query like "%${query}%" `;
    if (endpoint && endpoint !== 'null') where = `${where} and endpoint like "%${endpoint}%" `;
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
   * select subscriptions
   * @param  {INTEGER}    id        id of subscription
   * @param  {TEXT}  queryid        queryid of subscription
   * @param  {TEXT}  subscriber     subscriber of subscription
   * @param  {TEXT}  query          query of subscription
   * @param  {TEXT}  endpoint       endpoint of subscription
   * @return {Promise}              array of selected rows
   */
  async read(id, queryid, subscriber, query, endpoint) {
    let where = '';

    if (id && id !== 'null') where = `${where} and id = ${id} `;
    if (queryid && queryid !== 'null') where = `${where} and queryid = "${queryid}" `;
    if (subscriber && subscriber !== 'null') where = `${where} and subscriber like "%${subscriber}%" `;
    if (query && query !== 'null') where = `${where} and query like "%${query}%" `;
    if (endpoint && endpoint !== 'null') where = `${where} and endpoint like "%${endpoint}%" `;
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
