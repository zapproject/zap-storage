var program = require('commander');
let dbPath = './db.sql'

program.version('0.1.0', '-v, --version')
  .option('-d, --dbpath [path]', 'Path of db')
//  .option('-n, --new [key]', 'Add new key')
//  .option('-d, --del [key]', 'Del key')
//  .option('-h, --help', 'Help list')
//  .parse(process.argv)
  .arguments('<cmd> [env]').action((cmd, env) => {
  cmdValue = cmd;
  envValue = env;

});
program.parse(process.argv);

// dbPath = program.dbpath ? program.dbpath : dbPath;
const db = require('db')(program.dbpath || dbPath);


if (typeof cmdValue === 'undefined') {
  console.error(`Unknown command: ${cmdValue}`);
  process.exit(1);
}else if (cmdValue == 'add') {
  db.models['notary_cred'].insert(envValue);

}else if (cmdValue == 'del') {
  db.models['notary_cred'].delete(envValue);

}else if (cmdValue == 'ls') {
  db.models['notary_cred'].read();

}else if (cmdValue == 'get') {
  db.models['notary_cred'].read(envValue);
}



console.log('environment:', envValue || "no environment given");
db.close();
