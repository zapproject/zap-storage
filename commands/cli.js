#!/usr/bin/env node
/*!
 * ZAP CLI v0.1.0
 * MIT Licensed
 */
const program = require('commander');

program.version('0.1.0', '-v, --version')
  .option('-d, --dbpath [path]', 'Path of db')
  .command('add <pid> <accesskey> <secretkey>', 'add new key')
  .command('del [pid] [accesskey] [secretkey]', 'delete selected keys')
  .command('delbyid <pid>', 'delete keys by id')
  .command('ls ', 'install one or more packages')
  .command('get [pid] [accesskey] [secretkey]', 'install one or more packages')
  .command('getbyid <id>', 'get key by id row')
  .parse(process.argv);
//
// program.on('--help', () => {
//   console.log('');
//   console.log('  Commands:');
//   console.log('');
//   console.log('   add      - add new row,       parameters: <pid> <accesskey> <secretkey>');
//   console.log('   delbyid  - delete by id row,  parameters: <id> ');
//   console.log('   del      - delete row,        parameters: [pid] [accesskey] [secretkey]');
//   console.log('   ls       - list all rows,     parameters: <id> ');
//   console.log('   getbyid  - get by id row,     parameters: <id> ');
//   console.log('   get      - get row,           parameters: [pid] [accesskey] [secretkey]');
//   console.log('');
//   console.log('  Examples:');
//   console.log('');
//   console.log('    $ oracle-cli -d ./mydata.sqllite add 304 jkdfji4993df pwd#4mddf');
//   console.log('    $ oracle-cli ls');
//   console.log('    $ oracle-cli get null i499');
//   console.log('');
//   process.exit(0);
// });


// // init Database
// require('../db')(program.dbpath || dbPath)
//   .then((db) => {
//     if (typeof cmdVal === 'undefined') {
//       console.error(`Unknown command: ${cmdVal}`);
//       process.exit(1);
//     }
//   });
