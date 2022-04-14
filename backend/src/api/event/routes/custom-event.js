'use strict'

// add events/me api route
module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/events/me',
      handler: 'event.me',
      config: {},
    },
  ],
}
