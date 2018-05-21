/*!
 * ZAP CLI
 * MIT Licensed
 */
console.log('');
console.log('  Commands of "notary" partition:');
console.log('  -------------------------------');
console.log('');

console.log('   add     [ptions] - add new key');
console.log('           -p --pid <pid>');
console.log('           -a --accesskey <accesskey>');
console.log('           -s --secretkey <secretkey>');
console.log('   delbyid [ptions] - delete key by id');
console.log('           -i --id <id>');
console.log('   del     [ptions] - delete key');
console.log('           -p --pid [pid]');
console.log('           -a --accesskey [accesskey]');
console.log('           -s --secretkey [secretkey]');
console.log('   ls      - list all keys');
console.log('   getbyid [ptions] - get key by id');
console.log('           -i --id <id>');
console.log('   get     [ptions] - get keys');
console.log('           -p --pid [pid]');
console.log('           -a --accesskey [accesskey]');
console.log('           -s --secretkey [secretkey]');
console.log('');
console.log('  Examples:');
console.log('');
console.log('    $ zap-cli notary add -p 304 -a jkdfji4993df -s pwd#4mddf');
console.log('    $ zap-cli notary ls');
console.log('    $ zap-cli -d ./mydata.sqllite notary notary get -a i499');
console.log('');
