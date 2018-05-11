#!/usr/bin/env node
/*!
 * ZAP CLI v0.1.0
 * MIT Licensed
 */
const fs = require('fs');
const path = require('path');
const program = require('commander');

program
  .version('0.1.0', '-v, --version')
  .description('ZAP Client for managing of database')
  .option('-d, --dbpath [path]', 'Path of db')
  .on('--help', () => {
    // run all help of entitys
    fs
      .readdirSync(__dirname)
      .filter(folder => (folder.indexOf('.') < 0))
      .forEach((folder) => {
        require(path.join(__dirname, folder, 'help'));
      });

    process.exit(0);
  })
  .parse(process.argv);

program
  .arguments('<entity> [command]')
  .action((entity, command) => {
    if (program.rawArgs[3] === '--help') {
      require(path.join(__dirname, entity, 'help'));
    } else {
      require(path.join(__dirname, entity, command));
    }
  })
  .parse(process.argv);
