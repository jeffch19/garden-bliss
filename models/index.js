const sequelize = require('../config/connection');
const User = require('./user');
const Plant = require('./plant');
const Tip = require('./tip');
const Post = require('./Post');
const Comment = require('./Comment');

// Relationships
User.hasMany(Post,
  {
    foreignKey: 'user_id'
  });

Post.belongsTo(User,
  {
    foreignKey: 'user_id' 
  });  

User.hasMany(Plant, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

Comment.belongsTo(User, 
  {
      foreignKey: 'user_id'
  });
  
Post.hasMany(Comment, 
  {
      foreignKey: 'post_id'
  });
        
Comment.belongsTo(Post, 
  {
      foreignKey: 'post_id'
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

module.exports = { User, Plant, Tip, Post, Comment };
