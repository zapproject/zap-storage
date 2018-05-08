/*!
 * ZAP CLI
 * MIT Licensed
 */

const name = 'notary_cred';

module.exports = (sequelize, DataTypes) => {
  const notaryCred = sequelize.define(name, {
    pid: DataTypes.INTEGER,
    accesskey: DataTypes.TEXT,
    secretkey: DataTypes.TEXT,

    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
  }, {});

  notaryCred.associate = function associate() {
    // associations can be defined here
  };

  this.provider = sequelize;
  this.name = name;
  return notaryCred;
};
