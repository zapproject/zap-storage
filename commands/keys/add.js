/*!
 * ZAP CLI
 * MIT Licensed
 */
const program = require('commander');
const Storage = require('../../Services/StorageKeys');

program
  .option('-n, --network <network>', 'network name')
  .option('-p, --publick <publick>', 'publick key')
  .option('-s, --privat <privat>', 'private key')
  .parse(process.argv);

const storage = new Storage(program.dbpath);

/**
 * Comand get rows
 */
storage.init()
  .catch(console.error)
  .then((st) => {
    console.log('New Key ..');
    console.log('----------------------------');
    st.add(program.network, program.publick, program.privat).then((row) => {
      if (row) console.log(JSON.stringify(row));
    }).catch(() => {});
  });
