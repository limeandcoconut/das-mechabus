// Update this url in ./meta.config.js too. It saves a notable chunk from the bundles by doing it manually.
const isProd = require('../client/utils').isProd()

module.exports = {
  productionHost: 'https://das-mechabus.jacobsmith.tech',
  frontendPort: 3015,
  // TODO: move to https
  httpProtocol: isProd || process.env.USE_PROD_API ? 'http://' : 'http://',
  apiHost: isProd || process.env.USE_PROD_API ? '10.0.0.4' : 'localhost',
  httpPort: 3998,
  wsProtocol: isProd || process.env.USE_PROD_API ? 'ws://' : 'ws://',
  wsPort: 3535,
  gaDevelopmentId: '',
  gaProductionId: '',
  controllers: [
    {
      name: 'kitchen',
      id: 'swi2.1',
    },
  ],
}
