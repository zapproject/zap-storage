/* ! ZAP CLI Copyright(c) 2018 Kudriavtsev Sergey @ smartum.pro MIT Licensed */
"use strict";
const model = {};

model.name = 'notary_cred';

/**
 * init model driver
 * @param  {obj} driver driver of db
 * @return {void}
 */
model.init = (driver) => {
  model.driver = driver;
  model.create();
}

/**
 * create table of model
 * @return {void}
 */
model.create = () => {
  console.log(`Create table ${model.name}`);
  model.driver.run(`CREATE TABLE IF NOT EXISTS ${model.name} (
      id  INTEGER PRIMARY KEY AUTOINCREMENT,
      pid INTEGER,
      accesskey TEXT,
      secretkey TEXT
    )`);
}

/**
 * insert new row
 * @param  {INTEGER}    pid  provider id
 * @param  {TEXT} accesskey token of access
 * @param  {TEXT} secretkey key
 * @return {void}
 */
model.insert = (pid, accesskey, secretkey) => {
  console.log(`Insert row to ${model.name}`);
  const stmt = model.driver.prepare(`INSERT INTO ${model.name}(pid,accesskey,secretkey) VALUES (?,?,?)`);

  stmt.run(pid, accesskey, secretkey);
  stmt.finalize();
}

/**
 * delete row
 * @param  {INTEGER}    id   id of row
 * @param  {INTEGER}    pid  provider id
 * @param  {TEXT} accesskey token of access
 * @param  {TEXT} secretkey key
 * @return {void}
 */
model.delete = (id, pid, accesskey, secretkey) => {
  console.log(`Delete row in ${model.name}`);

  let where = '';
  if (id && id !== 'null' )
    where = where + ` and id = ${id} `;
  if (pid && pid !== 'null')
    where = where + ` and pid = ${pid} `;
  if (accesskey && accesskey !== 'null')
    where = where + ` and accesskey like "%${accesskey}%" `;
  if (secretkey && secretkey !== 'null')
    where = where + ` and secretkey = ${secretkey} `;
  if (where !== '')
    where = 'WHERE 1 = 1 ' + where;

  const stmt = model.driver.prepare(`DELETE FROM ${model.name} ${where}`);

  stmt.run();
  stmt.finalize();
}

/**
 * read rows
 * @param  {INTEGER}    id   id of row
 * @param  {INTEGER}    pid  provider id
 * @param  {TEXT} accesskey token of access
 * @param  {TEXT} secretkey key
 * @return {void}
 */
model.read = (id, pid, accesskey, secretkey) => {
  console.log('Read Rows ..' + pid);

  let where = '';
  if (id && id !== 'null' )
    where = where + ` and id = ${id} `;
  if (pid && pid !== 'null')
    where = where + ` and pid = ${pid} `;
  if (accesskey && accesskey !== 'null')
    where = where + ` and accesskey like "%${accesskey}%" `;
  if (secretkey && secretkey !== 'null')
    where = where + ` and secretkey = ${secretkey} `;
  if (where !== '')
    where = 'WHERE 1 = 1 ' + where;

  model.driver.all(`SELECT * FROM ${model.name} ${where}`, (err, rows) => {
    if (rows)
      rows.forEach((row) => {
        console.log(JSON.stringify(row));
      })
  })
  // return rows;);
}

module.exports = model;
