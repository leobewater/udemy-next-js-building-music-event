'use strict'

/**
 *  event controller
 */

const { createCoreController } = require('@strapi/strapi').factories

//module.exports = createCoreController('api::event.event');

// add events/me api route
module.exports = createCoreController('api::event.event', ({ strapi }) => ({
  // create event with linked user
  async create(ctx) {
    let entity
    ctx.request.body.data.user = ctx.state.user
    entity = await strapi.service('api::event.event').create(ctx.request.body)
    return entity
  },
  
  // Get logged in users
  async me(ctx) {
    const user = ctx.state.user

    if (!user) {
      return ctx.badRequest(null, [
        { message: 'No authorization header was found' },
      ])
    }

    const data = await strapi.db.query('api::event.event').findMany({
      where: {
        user: { id: user.id },
      },
      populate: { user: true, image: true },
    })
    if (!data) {
      return ctx.notFound()
    }

    const res = await this.sanitizeOutput(data, ctx)
    return res
  },
}))
