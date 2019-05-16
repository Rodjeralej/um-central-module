const { Joi } = require('koa-joi-router');

const issueJWT = require('../../lib/issueJWT');
const { models: { User } } = require('../../models');
const ldapAuth = require('../../services/ldap');
const createRefreshToken = require('../../lib/createRefreshToken');

const loginHandler = async (ctx, next) => {
  const { smAccountName, password } = ctx.request.body;

  const { data } = await ldapAuth(smAccountName, password);

  ctx.assert(data.code === 200, 'Invalid Credentials');

  let user = await User.findOne({ smAccountName }).populate('roles').populate(('entitlements'));

  if (!user) {
    user = new User({
      smAccountName,
      password,
      account: {
        status: 'pending',
      },
    });
  }

  const refreshToken = createRefreshToken();
  user.addRefreshToken(refreshToken);

  await user.save();

  ctx.state.user = user;
  ctx.state.refreshToken = refreshToken;

  await next();
  ctx.status = 200;
};

module.exports = {
  method: 'post',
  path: '/login',
  validate: {
    type: 'json',
    body: {
      smAccountName: Joi.string().required(),
      password: Joi.string().required(),
    },
  },
  handler: [loginHandler, issueJWT],
};
