/*!
 * ZAP CLI
 * MIT Licensed
 */
const program = require('commander');
const Storage = require('../../Services/StorageSubscriptions');

program
  .option('-m, --queryid <queryid>', 'query id')
  .option('-s, --subscriber <subscriber>', 'subscriber')
  .option('-q, --query <query>', 'query')
  .option('-e, --endpoint <endpoint>', 'endpoint')
  .option('-p, --endpointparams [endpointparams]', 'endpointparams')
  .parse(process.argv);

const storage = new Storage(program.dbpath);

/**
 * Comand get rows
 */
storage.init()
  .catch(console.error)
  .then((st) => {
    console.log('New subscription ..');
    console.log('----------------------------');
    st.add(
      program.queryid,
      program.subscriber,
      program.query,
      program.endpoint,
      program.endpointparams,
    ).then((row) => {
      if (row) console.log(row);
    }).catch(() => {});
  });
