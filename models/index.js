const sequelize = require('../config/connection');
const User = require('./user');
const Plant = require('./plant');
const Tip = require('./tip');

// Relationships
User.hasMany(Plant, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

Plant.belongsTo(User, {
  foreignKey: 'user_id',
});

User.hasMany(Tip, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

Tip.belongsTo(User, {
  foreignKey: 'user_id',
});

module.exports = { User, Plant, Tip };
