module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('keys', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    network: {
      type: Sequelize.STRING,
    },
    publick: {
      type: Sequelize.STRING,
    },
    privat: {
      type: Sequelize.STRING,
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
