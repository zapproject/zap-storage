/* ! ZAP CLI MIT Licensed */

const name = 'subscriptions';

module.exports = (sequelize, DataTypes) => {
  const subscriptions = sequelize.define(name, {
    queryid: DataTypes.TEXT,
    subscriber: DataTypes.TEXT,
    query: DataTypes.TEXT,
    endpoint: DataTypes.TEXT,
    endpointparams: DataTypes.TEXT,

    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
  }, {});


  subscriptions.associate = function associate() {
    // associations can be defined here
  };

  this.provider = sequelize;
  this.name = name;
  return subscriptions;
};
