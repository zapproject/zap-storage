/*!
 * ZAP CLI
 * MIT Licensed
 */

const name = 'keys';

module.exports = (sequelize, DataTypes) => {
  const subscriptions = sequelize.define(name, {
    network: DataTypes.STRING,
    public: DataTypes.STRING,
    privat: DataTypes.STRING,

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
