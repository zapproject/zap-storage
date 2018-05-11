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
 * Comand get by id
 */
storage.init().then((st) => {
  console.log('Read Row ..');
  console.log('----------------------------');
  st.read(idVal).then((row) => {
    if (row) console.log(JSON.stringify(row));
  });
});
