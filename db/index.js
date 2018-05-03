const sqlite3 = require('sqlite3').verbose();
const model = require('notary_cred');

let db = {};

/**
 * [db description]
 * @param  {[type]} path [description]
 * @return {[type]}      [description]
 */
module.exports.db = (path) => {

  if !(db instanceof sqlite3){
    db = new sqlite3.cached.Database(path, model['notary_cred']);
  }

return db;
}
