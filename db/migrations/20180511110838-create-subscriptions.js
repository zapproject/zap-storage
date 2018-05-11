module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('subscriptions', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    queryid: {
      type: Sequelize.TEXT,
    },
    subscriber: {
      type: Sequelize.TEXT,
    },
    query: {
      type: Sequelize.TEXT,
    },
    endpoint: {
      type: Sequelize.TEXT,
    },
    endpointparams: {
      type: Sequelize.TEXT,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('subscriptions'),
};
