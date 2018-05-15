/*!
 * ZAP CLI
 * MIT Licensed
 */
const program = require('commander');
const Storage = require('../../Services/StorageNotary');

program
  .option('-i, --id [id]', 'key id')
  .parse(process.argv);

const storage = new Storage(program.dbpath);

/**
 * Comand get by id
 */
storage.init()
  .catch(console.error)
  .then((st) => {
    console.log('Read Row ..');
    console.log('----------------------------');
    st.read(program.id).then((rows) => {
      rows.forEach((row) => {
        if (row) console.log(JSON.stringify(row));
      });
    }).catch(() => {});
  });
