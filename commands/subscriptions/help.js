/*!
 * ZAP CLI
 * MIT Licensed
 */
console.log('');
console.log('  Commands of "subscriptions" partition:');
console.log('  -------------------------------');
console.log('');
console.log('   add     [ptions] - add new subscription');
console.log('           -m --queryid <queryid>');
console.log('           -s --subscriber <subscriber>');
console.log('           -q --query <query>');
console.log('           -e --endpoint <endpoint>');
console.log('           -p --endpointparams [endpointparams]');
console.log('   delbyid [ptions] - delete subscription by id');
console.log('           -i --id <id>');
console.log('   del     [ptions] - delete subscription');
console.log('           -m --queryid [queryid]');
console.log('           -s --subscriber [subscriber]');
console.log('           -q --query [query]');
console.log('           -e --endpoint [endpoint]');
console.log('   ls      - list all subscriptions');
console.log('   getbyid [ptions] - get subscriptions by id');
console.log('           -i --id <id>');
console.log('   get     [ptions] - get subscriptions');
console.log('           -m --queryid [queryid]');
console.log('           -s --subscriber [subscriber]');
console.log('           -q --query [query]');
console.log('           -e --endpoint [endpoint]');
console.log('');
console.log('  Examples:');
console.log('');
console.log('    $ zap-cli subscriptions add -m 304sdf45 -s jkdfji4993df -q "srg=ar1" -e "http://example.com/api" -p {"prm1":"val1","prm2":"val2"}');
console.log('    $ zap-cli subscriptions ls');
console.log('    $ zap-cli -d ./mydata.sqllite subscriptions get -s i499');
console.log('');
