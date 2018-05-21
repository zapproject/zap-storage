/*!
 * ZAP CLI
 * MIT Licensed
 */
console.log('');
console.log('  Commands of "keys" partition:');
console.log('  -------------------------------');
console.log('');

console.log('   add     [ptions] - add new key');
console.log('           -n --network <network>');
console.log('           -p --publick <publick>');
console.log('           -s --privat <privat>');
console.log('   delbyid [ptions] - delete key by id');
console.log('           -i --id <id>');
console.log('   del     [ptions] - delete key');
console.log('           -n --network [network]');
console.log('           -p --publick [publick]');
console.log('           -s --privat [privat]');
console.log('   ls      - list all keys');
console.log('   getbyid [ptions] - get key by id');
console.log('           -i --id <id>');
console.log('   get     [ptions] - get keys');
console.log('           -n --network [network]');
console.log('           -p --publick [publick]');
console.log('           -s --privat [privat]');
console.log('');
console.log('  Examples:');
console.log('');
console.log('    $ zap-cli keys add -n kovan -p 0xc01f290bffa5ed6e7cce357c644d75077d74156e -s a75e2222b6893279e2242a72c7134d8f465e6d');
console.log('    $ zap-cli keys ls');
console.log('    $ zap-cli -d ./mydata.sqllite keys get -n kovan');
console.log('');
