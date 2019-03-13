const { models: { Entitlement } } = require('../../models');

module.exports = {
  method: 'get',
  path: '/',
  handler: async (ctx) => {
    const { limit, skip, search } = ctx.request.query;
    const searchQuery = {};
    if (search) {
      searchQuery.$or = [
        { name: { $regex: search, $options: 'i' } },
      ];
    }

    const entitlements = await Entitlement
      .find(searchQuery)
      .limit(Number(limit))
      .skip(Number(skip))
      .exec();
    const count = await Entitlement.count(searchQuery);

    ctx.body = entitlements;
    ctx.set('x-total-count', count);
    ctx.status = 200;
  },
};
