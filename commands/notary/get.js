/*!
 * ZAP CLI
 * MIT Licensed
 */
const program = require('commander');
const Storage = require('../../interfaces/StoregeNotary');

let pidVal, accesskeyVal, secretkeyVal;

program
  .action((pid, accesskey, secretkey) => {
    pidVal = (typeof pid !== 'object') ? pid : null;
    accesskeyVal = (typeof accesskey !== 'object') ? accesskey : null;
    secretkeyVal = (typeof secretkey !== 'object') ? secretkey : null;
  })
  .parse(process.argv);

const storage = new Storage(program.dbpath);

/**
 * Comand get rows
 */
storage.init().then((st) => {
  console.log('Read Rows ..');
  console.log('----------------------------');
  st.read(null, pidVal, accesskeyVal, secretkeyVal).then((row) => {
    if (row) console.log(JSON.stringify(row));
  });
});
