/*!
 * ZAP CLI
 * MIT Licensed
 */
const program = require('commander');
const Storage = require('../../Services/StorageKeys');

program
  .option('-i, --id <id>', 'key id')
  .parse(process.argv);

const storage = new Storage(program.dbpath);

/**
 * Comand del rows
 */
storage.init()
  .catch(console.error)
  .then((st) => {
    console.log('Delete Rows ..');
    console.log('----------------------------');
    st.del(program.id).then((rows) => {
      rows.forEach((row) => {
        if (row) console.log(JSON.stringify(row));
      });
    }).catch(() => {});
  });
