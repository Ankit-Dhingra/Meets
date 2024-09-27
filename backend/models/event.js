const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user'); 

const Event = sequelize.define('Event', {
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  date: { type: DataTypes.DATE, allowNull: false },
  userId: { 
    type: DataTypes.INTEGER, 
    allowNull: false,
    references: {
      model: User, 
      key: 'id',  
    },
  },
});

Event.belongsTo(User, { foreignKey: 'userId' }); 
User.hasMany(Event, { foreignKey: 'userId' }); 

module.exports = Event;

