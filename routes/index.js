const { Joi } = require('koa-joi-router');
const objectIdFactory = require('joi-objectid');

Joi.objectId = objectIdFactory(Joi);

const router = require('koa-joi-router');

const publicRoutes = require('./public');
const usersRoutes = require('./users');
const entitlementsRoutes = require('./entitlements');
const rolesRoutes = require('./roles');

const pub = router();
pub.prefix('/');
pub.route(publicRoutes);

const users = router();
users.prefix('/users');
users.route(usersRoutes);

const entitlements = router();
entitlements.prefix('/entitlements');
entitlements.route(entitlementsRoutes);

const roles = router();
roles.prefix('/roles');
roles.route(rolesRoutes);

const routes = {
  pub,
  users,
  entitlements,
  roles,
};

module.exports = routes;
