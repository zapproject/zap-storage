#!/usr/bin/env node
/*!
 * ZAP CLI v0.1.0
 * MIT Licensed
 */
console.log('');
try {
 require('./commands/cli');
} catch (err) {
  console.log('....');
}
