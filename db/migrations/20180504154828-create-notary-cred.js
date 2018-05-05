module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('notary_cred', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    pid: {
      type: Sequelize.INTEGER,
    },
    accesskey: {
      type: Sequelize.TEXT,
    },
    secretkey: {
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
  down: (queryInterface, Sequelize) => queryInterface.dropTable('notary_cred'),
};
