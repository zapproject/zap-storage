/*!
 * ZAP CLI
 * Copyright(c) 2018 Kudriavtsev Sergey @ smartum.pro
 * MIT Licensed
 */
"use strict";
const sqlite3 = require('sqlite3').verbose();
let fs = require("fs");
let path = require("path");
let models = {};
let db = {};

// read all models
fs.readdirSync(__dirname).filter((file) => {
  return (file.indexOf(".") > 0) && (file !== "index.js");
}).forEach((file) => {
  let model = require(path.join(__dirname, file));
  models[model.name] = model;
});


/**
 * export function of models
 * @param  string path path of Database
 * @return {obj}       models of sqlite
 */
module.exports = (path) => {
  // init db
  if (!(db instanceof sqlite3.cached.Database)) {
    db = new sqlite3.Database(path);
    for (let model in models) {
      models[model].init(db);
    }
    models.close = db.close.bind(db);
  }

  return models;
}
