const { Joi } = require('koa-joi-router');
const objectIdFactory = require('joi-objectid');

Joi.objectId = objectIdFactory(Joi);

const router = require('koa-joi-router');

const publicRoutes = require('./public');
const usersRoutes = require('./users');

const pub = router();
pub.prefix('/');
pub.route(publicRoutes);

const users = router();
users.prefix('/users');
users.route(usersRoutes);

const routes = {
  pub,
  users,
};

module.exports = routes;
