/*!
 * ZAP CLI
 * MIT Licensed
 */
const program = require('commander');
const Storage = require('../../Services/StorageNotary');

program
  .option('-p, --pid [pid]', 'process id')
  .option('-a, --accesskey [accesskey]', 'access key')
  .option('-s, --secretkey [secretkey]', 'secret key')
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
    st.del(null, program.pid, program.accesskey, program.secretkey).then((rows) => {
      rows.forEach((row) => {
        if (row) console.log(JSON.stringify(row));
      });
    }).catch(() => {});
  });
