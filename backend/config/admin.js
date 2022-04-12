module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '6bbe9a37e38370e3519f4df31e878a0d'),
  },
});
