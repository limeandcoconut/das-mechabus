// Update this url in ./meta.config.js too. It saves a notable chunk from the bundles by doing it manually.
const isProd = require('../client/utils').isProd()
module.exports = {
  productionHost: 'https://das-mechabus.jacobsmith.tech',
  frontendPort: 3015,
  apiEndpoint: isProd || !process.env.USE_PROD_API ? 'http://10.0.0.4' : `http://localhost:3998`,
  gaDevelopmentId: '',
  gaProductionId: '',
  controllers: {
    kitchen: {
      id: 'swi2.1',
      action: 'toggle',
    },
  },
}
