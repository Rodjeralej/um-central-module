const { Joi } = require('koa-joi-router');
const objectIdFactory = require('joi-objectid');

Joi.objectId = objectIdFactory(Joi);

const router = require('koa-joi-router');

const publicRoutes = require('./public');

const pub = router();
pub.prefix('/');
pub.route(publicRoutes);

const routes = {
  pub,
};

module.exports = routes;
