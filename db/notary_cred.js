const model = {};

model.name = 'notary_cred';

model.init = (db)=> {
  model.db = db;
}

model.create = ()=> {
    console.log("createTable lorem");
    model.db.run(`CREATE TABLE IF NOT EXISTS ${model.name} (info TEXT)`, model.insert);
}

model.insert = (key)=> {
    console.log(`Insert row ${model.name}`);
    const stmt = db.prepare(`INSERT INTO ${model.name} VALUES (?)`);

    stmt.run(key);

    stmt.finalize(model.read);
}


model.read = (key)=> {
    console.log("readAllRows lorem");
    // TODO: where key=key
    db.all(`SELECT rowid AS id, * FROM ${model.name} `, function(err, rows) {
        rows.forEach(function (row) {
            console.log(row.id + ": " + row.info);
        });
        closeDb();
    });
}

module.exports.models[model.name] = model;
