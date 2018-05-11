/*!
 * ZAP CLI
 * MIT Licensed
 */
const program = require('commander');
const Storage = require('../../interfaces/StoregeNotary');

let idVal;

program
  .action((id) => {
    idVal = (typeof id !== 'object') ? id : null;
  })
  .parse(process.argv);

const storage = new Storage(program.dbpath);

/**
 * Comand del rows
 */
storage.init().then((st) => {
  console.log('Delete Rows ..');
  console.log('----------------------------');
  st.del(idVal).then((row) => {
    if (row) console.log(JSON.stringify(row));
  });
});
