const { Joi } = require('koa-joi-router');
const { models: { User } } = require('../../models');

module.exports = {
  method: 'post',
  path: '/register',
  validate: {
    type: 'json',
    body: {
      payload: Joi.object().keys({
        email: Joi.string(),
        name: Joi.string(),
        ci: Joi.string().required(),
        phone: Joi.string(),
      }),
    },
  },
  handler: async (ctx) => {
    const { payload: newUser } = ctx.request.body;

    const oldUser = await User.findOne({ ci: newUser.ci });
    ctx.assert(!oldUser, 400, 'User already exist, CI in use');

    const { email, name, ci, phone } = newUser;

    const user = new User({ email, name, ci, phone });
    await user.save();

    ctx.body = await User.sanitize(user);
    ctx.status = 201;
  },
};
