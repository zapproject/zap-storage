/*!
 * ZAP CLI
 * MIT Licensed
 */
console.log('');
console.log('  Commands of "notary" partition:');
console.log('  -------------------------------');
console.log('');
console.log('   add      - add new key,       parameters: <pid> <accesskey> <secretkey>');
console.log('   delbyid  - delete key by id,  parameters: <id> ');
console.log('   del      - delete key,        parameters: [pid] [accesskey] [secretkey]');
console.log('   ls       - list all keys,     parameters: <id> ');
console.log('   getbyid  - get key by id,     parameters: <id> ');
console.log('   get      - get keys,          parameters: [pid] [accesskey] [secretkey]');
console.log('');
console.log('  Examples:');
console.log('');
console.log('    $ zap-cli -d ./mydata.sqllite notary add 304 jkdfji4993df pwd#4mddf');
console.log('    $ zap-cli notary ls');
console.log('    $ zap-cli notary get null i499');
console.log('');
