/*!
 * ZAP CLI
 * MIT Licensed
 */

const model = {};
const name = 'notary_cred';

/**
 * init model provider
 * @param  {obj} provider driver of provider
 * @return {void}
 */
model.init = (provider) => {
  model.provider = provider;
};

/**
 * insert new row
 * @param  {INTEGER}    pid  provider id
 * @param  {TEXT} accesskey token of access
 * @param  {TEXT} secretkey key
 * @return {void}
 */
model.insert = function add(pid, accesskey, secretkey) {
  this.create({
    pid,
    accesskey,
    secretkey,
  }).then(() => {
    console.log(`Insert row to ${name}`);
  });
};

/**
 * delete row
 * @param  {INTEGER}    id   id of row
 * @param  {INTEGER}    pid  provider id
 * @param  {TEXT} accesskey token of access
 * @param  {TEXT} secretkey key
 * @return {void}
 */
model.delete = function del(id, pid, accesskey, secretkey) {
  let where = '';
  if (id && id !== 'null') where = `${where} and id = ${id} `;
  if (pid && pid !== 'null') where = `${where} and pid = ${pid} `;
  if (accesskey && accesskey !== 'null') where = `${where} and accesskey like "%${accesskey}%" `;
  if (secretkey && secretkey !== 'null') where = `${where} and secretkey = ${secretkey} `;
  if (where !== '') where = ` WHERE 1 = 1 ${where}`;

  this.provider.query(`DELETE FROM ${name} ${where}`)
    .then(() => {
      console.log(`Delete row in ${name}`);
    });
};

/**
 * read rows
 * @param  {INTEGER}    id   id of row
 * @param  {INTEGER}    pid  provider id
 * @param  {TEXT} accesskey token of access
 * @param  {TEXT} secretkey key
 * @return {void}
 */
model.read = function read(id, pid, accesskey, secretkey) {
  let where = '';
  if (id && id !== 'null') where = `${where} and id = ${id} `;
  if (pid && pid !== 'null') where = `${where} and pid = ${pid} `;
  if (accesskey && accesskey !== 'null') where = `${where} and accesskey like "%${accesskey}%" `;
  if (secretkey && secretkey !== 'null') where = `${where} and secretkey = ${secretkey} `;
  if (where !== '') where = ` WHERE 1 = 1 ${where}`;

  this.provider.query(`SELECT id,pid, accesskey, secretkey,
                              strftime('%Y-%m-%d %H:%M:%S', updatedAt) as updatedAt
                         FROM ${name} ${where}`)
    .then((rows) => {
      console.log('Read Rows ..');
      console.log('------------------------');
      if (rows) {
        rows[0].forEach((row) => {
          console.log(JSON.stringify(row));
        });
      }
    });
};

module.exports = (sequelize, DataTypes) => {
  const notaryCred = sequelize.define(name, {
    pid: DataTypes.INTEGER,
    accesskey: DataTypes.TEXT,
    secretkey: DataTypes.TEXT,

    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
  }, {});

  notaryCred.associate = function associate() {
    // associations can be defined here
  };

  // expand the model by private methods
  model.init(sequelize);
  return Object.assign(notaryCred, model);
};
