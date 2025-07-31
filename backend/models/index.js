const { Sequelize } = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite'
});

const User = require('./user')(sequelize);
const Ticket = require('./ticket')(sequelize);
const Comment = require('./comment')(sequelize);

// Relacionamentos
User.hasMany(Ticket, { as: 'tickets', foreignKey: 'userId' });
Ticket.belongsTo(User, { as: 'user', foreignKey: 'userId' });

Ticket.hasMany(Comment, { as: 'comments', foreignKey: 'ticketId' });
Comment.belongsTo(Ticket, { as: 'ticket', foreignKey: 'ticketId' });
Comment.belongsTo(User, { as: 'user', foreignKey: 'userId' });

sequelize.sync();

module.exports = { sequelize, User, Ticket, Comment };