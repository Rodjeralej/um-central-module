const { Joi } = require('koa-joi-router');
const { models: { Role } } = require('../../models');


module.exports = {
  method: 'post',
  path: '/',
  validate: {
    type: 'json',
    body: Joi.object().keys({
      name: Joi.string(),
      description: Joi.string(),
      enabled: Joi.boolean(),
    }),
  },
  handler: async (ctx) => {
    const { name, description, enabled } = ctx.request.body;

    const prevRole = await Role.findOne({ name });
    if (prevRole) {
      ctx.throw(400, 'Role already exist');
    }
    const role = new Role({
      name,
      description,
      enabled,
    });

    await role.save();
    ctx.body = role;
    ctx.status = 200;
  },

};
