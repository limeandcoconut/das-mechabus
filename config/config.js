
// Keep in sync with utils
const isProd = process.env.NODE_ENV === 'production'
const useProd = isProd || process.env.USE_PROD_API

const wsProtocol = useProd ? 'wss://' : 'ws://'
const host = useProd ? 'mechabus.jacobsmith.tech' : 'localhost'
const wsPort = isProd ? '' : ':3535'

module.exports = {
  // Update this url in ./meta.config.js too. It saves a notable chunk from the bundles by doing it manually.
  productionHost: 'https://mechabus.jacobsmith.tech',
  frontendPort: 3015,
  wsEndpoint: `${wsProtocol}${host}${wsPort}`,
  gaProductionId: '',
  controllers: [
    {
      name: 'kitchen',
      id: 'swi2.1',
    },
  ],
}
