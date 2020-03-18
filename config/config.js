// Update this url in ./meta.config.js too. It saves a notable chunk from the bundles by doing it manually.
const isProd = require('../client/utils').isProd()
const useProd = isProd || process.env.USE_PROD_API

const host = useProd ? 'das-mechabus.jacobsmith.tech' : 'localhost'
// const httpProtocol = useProd ? 'http://' : 'http://'
const wsProtocol = useProd ? 'wss://' : 'ws://'
const wsPort = useProd ? '' : ':3535'

module.exports = {
  productionHost: 'https://das-mechabus.jacobsmith.tech',
  frontendPort: 3015,
  wsEndpoint: `${wsProtocol}${host}${wsPort}`,
  gaDevelopmentId: '',
  gaProductionId: '',
  controllers: [
    {
      name: 'kitchen',
      id: 'swi2.1',
    },
  ],
}
