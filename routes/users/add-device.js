const { Joi } = require('koa-joi-router');
const { models: { User }, enums: { userEnums: { devicesTypes } } } = require('../../models');

const { USER_DEVICES_MAX } = process.env;


module.exports = {
  method: 'post',
  path: '/:userId/device',
  validate: {
    type: 'json',
    params: {
      userId: Joi.objectId(),
    },
    body: Joi.object().keys({
      name: Joi.string().required(),
      deviceType: Joi.number().valid(Object.values(devicesTypes)).required(),
      mac: Joi.string().required(),
      modifiedDate: Joi.date().required(),
      isEnabled: Joi.boolean(),
    }),
  },
  handler: async (ctx) => {
    const { userId } = ctx.request.params;
    const device = ctx.request.body;

    const user = await User.findById(userId);

    ctx.assert(user, 404, 'User not found');

    const enabledDev = user.devices.filter(d => d.isEnabled);

    ctx.assert(enabledDev.length < USER_DEVICES_MAX, 400, 'Max number of enabled devices reached');

    user.devices.push(device);

    await user.save();

    ctx.status = 200;
    ctx.body = user;
  },
};
