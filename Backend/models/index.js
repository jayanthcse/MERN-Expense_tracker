const User = require('./User.sequelize');
const Transaction = require('./Transaction.sequelize');

// Define relationships
User.hasMany(Transaction, {
  foreignKey: 'userId',
  as: 'transactions',
  onDelete: 'CASCADE',
});

Transaction.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user',
});

module.exports = {
  User,
  Transaction,
};
