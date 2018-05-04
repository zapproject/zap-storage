/* ! ZAP CLI v0.1.0 Copyright(c) 2018 Kudriavtsev Sergey @ smartum.pro MIT Licensed */

const program = require('commander');
const dbPath = './db.sqllite'

program.version('0.1.0', '-v, --version')
.option('-d, --dbpath [path]', 'Path of db')
//  .option('-n, --new [key]', 'Add new key')
//  .option('-d, --del [key]', 'Del key')
//  .option('-h, --help', 'Help list')
//  .parse(process.argv)
  .arguments('<cmd> [env0] [env1] [env2] [env3]')
  .action((cmd, env0, env1, env2, env3) => {
    cmdVal = cmd;
    env0Val = env0;
    env1Val = env1;
    env2Val = env2;
    env3Val = env3;

});

program.on('--help', () => {
  console.log('');
  console.log('  Commands:');
  console.log('');
  console.log('   add      - add new row,       parameters: <pid> <accesskey> <secretkey>');
  console.log('   delbyid  - delete by id row,  parameters: <id> ');
  console.log('   del      - delete row,        parameters: [pid] [accesskey] [secretkey]');
  console.log('   ls       - list all rows,     parameters: <id> ');
  console.log('   getbyid  - get by id row,     parameters: <id> ');
  console.log('   get      - get row,           parameters: [pid] [accesskey] [secretkey]');
  console.log('');
  console.log('  Examples:');
  console.log('');
  console.log('    $ oracle-cli -d ./mydata.sqllite add 304 jkdfji4993df pwd#4mddf');
  console.log('    $ oracle-cli ls');
  console.log('    $ oracle-cli get null i499');
  console.log('');
});

program.parse(process.argv);

// init Database
const db = require('./db')(program.dbpath || dbPath);

if (typeof cmdVal === 'undefined') {
  console.error(`Unknown command: ${cmdVal}`);
  process.exit(1);

} else if (cmdVal == 'add') {
  // validation params
  if (env0Val && env1Val && env2Val) {
    db.notary_cred.insert(env0Val, env1Val, env2Val);
  } else {
    console.log(`incorrect require params:` +
      ` pid=${env0Val || '?'} accesskey=${env1Val || '?'} secretkey=${env2Val || '?'}`);
  }

} else if (cmdVal == 'delbyid') {

  db.notary_cred.delete(env0Val);

} else if (cmdVal == 'del') {

  db.notary_cred.delete(null, env0Val, env1Val, env2Val);

} else if (cmdVal == 'ls') {

  db.notary_cred.read();

} else if (cmdVal == 'getbyid') {

  db.notary_cred.read(env0Val);

} else if (cmdVal == 'get') {

  db.notary_cred.read(null, env0Val, env1Val, env2Val);
}

db.close();
