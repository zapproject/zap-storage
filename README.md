# ZAP Cli
----------

[![License](https://img.shields.io/npm/l/sequelize.svg?maxAge=2592000?style=plastic)](https://github.com/sequelize/sequelize/blob/master/LICENSE)


Client for managing the database
  - suppliers of datas
  - account credentials

##### notes
```
- In curent version, only the sqlite database type is supported
- By default, the database automatically install in the project root when you first call the client
```

### Installation

CLI requires [Node.js](https://nodejs.org/) v8+ to run.

Install the dependencies and run help command.

```sh
$ git clone https://github.com/zapproject/CLI.git
$ cd CLI
$ npm install
$ node . --help
```
##### note
- After the first start of the program, set APPKEY in .env file and safe it

#
### Help

You can call the help yourself with a command
```sh
$ ./commands/cli.js --help
```
* ###### Example add new key of notery
```sh
$ ./commands/cli.js notary add -p 394 -a tokenkeyexample -s keyexample
```
* ###### Example show all keys of notery
```sh
$ ./commands/cli.js notary ls
```
* ###### Example delete key of notery
```sh
$ ./commands/cli.js notary del -p 304
```
* ###### Example help of notery
```sh
$ ./commands/cli.js notary --help
```

### Tech

Client uses a number of open source projects to work properly:

* [SQLCipher] - Encryption for SQLite
* [SQLite3] - Awesome web-based text editor
* [Sequelize] - Sequelize is a promise-based Node.js ORM.
* [Node.js] - Evented I/O for the backend

License
---
MIT

[SQLCipher]:<https://www.zetetic.net/sqlcipher/>
[Sequelize]: <http://docs.sequelizejs.com/>
[SQLite3]: <https://github.com/mapbox/node-sqlite3>
[node.js]: <http://nodejs.org>
