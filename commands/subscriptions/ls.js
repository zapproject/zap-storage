/*!
 * ZAP CLI
 * MIT Licensed
 */
const program = require('commander');
const Storage = require('../../Services/StorageSubscriptions');

program
  .parse(process.argv);

const storage = new Storage(program.dbpath);

/**
 * Comand ls
 */
storage.init()
  .catch(console.error)
  .then((st) => {
    console.log('Read Rows ..');
    console.log('----------------------------');
    st.read().then((rows) => {
      rows.forEach((row) => {
        if (row) console.log(row);
      });
    }).catch(() => {});
  });
