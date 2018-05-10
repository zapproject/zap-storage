/*!
 * ZAP CLI
 * MIT Licensed
 */
const program = require('commander');
const Storage = require('../../interfaces/StoregeNotary');

program
  .parse(process.argv);

const storage = new Storage(program.dbpath);

/**
 * Comand ls
 */
storage.init().then((st) => {
  console.log('Read Rows ..');
  console.log('----------------------------');
  st.read().then((row) => {
    if (row) console.log(JSON.stringify(row));
  });
});
