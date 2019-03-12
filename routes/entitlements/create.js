const { Joi } = require('koa-joi-router');
const { models: { Entitlement } } = require('../../models');

module.exports = {
  method: 'post',
  path: '/',
  validate: {
    type: 'json',
    body: Joi.object().key({
      father: Joi.string(),
      name: Joi.string().required(),
    }),
  },
  handler: async (ctx) => {
    const { father, name } = ctx.request.body;

    const prevEntitlement = Entitlement.find({ name });
    if (prevEntitlement) {
      ctx.throw(400, 'Entitlement already exist');
    }

    const entitlement = new Entitlement({ name, father });
    await entitlement.save();

    ctx.body = entitlement;
    ctx.status = 200;
  },
};
