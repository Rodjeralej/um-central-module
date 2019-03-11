const config = require('config');
const Koa = require('koa');
const jwt = require('koa-jwt');
const MongooseError = require('mongoose/lib/error');
// const _ = require('lodash');
const bodyParser = require('koa-bodyparser');

const logger = require('./logger');
const db = require('./db');
const routes = require('../routes');

const { JWT_KEY } = process.env;

async function createApp() {
  try {
    const app = new Koa();

    app.use(async (ctx, next) => {
      if (!['post', 'put', 'patch'].includes(ctx.method.toLowerCase())) {
        ctx.disableBodyParser = true;
      }
      await next();
    });
    app.use(bodyParser());

    // TODO Add CORS

    // error middleware
    app.use(async (ctx, next) => {
      try {
        await next();
      } catch (err) {
        if (
          err instanceof MongooseError.ValidationError ||
          (err instanceof MongooseError && err.name === 'StrictModeError')
        ) {
          ctx.throw(400, err);
          return;
        }
        ctx.status = err.status || 500;
        if (ctx.status === 500) {
          logger.error(err);
          ctx.body = '';
        } else {
          ctx.body = err.body || err.message;
        }
        ctx.app.emit('error', err, this);
      }
    });

    // app.use(jwt({ secret: JWT_KEY, key: 'jwt', debug: config.get('jwt.debugEnabled') }));

    // check entitlements

    await db.waitOnConnection;

    app.use(routes.pub.middleware());

    return app;
  } catch (error) {
    logger.error(error.message);
  }
}

module.exports = createApp;
