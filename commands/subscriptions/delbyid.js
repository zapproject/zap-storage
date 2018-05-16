/*!
 * ZAP CLI
 * MIT Licensed
 */
const program = require('commander');
const Storage = require('../../Services/StorageSubscriptions');

program
  .option('-i, --id <id>', 'subscription id')
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
        if (row) console.log(row);
      });
    }).catch(() => {});
  });
