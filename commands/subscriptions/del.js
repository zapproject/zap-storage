/*!
 * ZAP CLI
 * MIT Licensed
 */
const program = require('commander');
const Storage = require('../../Services/StorageSubscriptions');

program
  .option('-m, --queryid [queryid]', 'query id')
  .option('-s, --subscriber [subscriber]', 'subscriber')
  .option('-q, --query [query]', 'query')
  .option('-e, --endpoint [endpoint]', 'endpoint')
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
    st.del(
      null,
      program.queryid,
      program.subscriber,
      program.query,
      program.endpoint,
      program.endpointparams,
    ).then((rows) => {
      rows.forEach((row) => {
        if (row) console.log(row);
      });
    }).catch(() => {});
  });
