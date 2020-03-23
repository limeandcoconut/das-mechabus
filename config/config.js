
// Keep in sync with utils
const isProd = process.env.NODE_ENV === 'production'
const useProd = isProd || process.env.USE_PROD_API

module.exports = {
  // Update this url in ./meta.config.js too. It saves a notable chunk from the bundles by doing it manually.
  productionHost: 'https://das-mechabus.jacobsmith.tech',
  frontendPort: 3015,
  host: useProd ? 'das-mechabus.jacobsmith.tech' : 'localhost',
  httpProtocol: useProd ? 'https://' : 'http://',
  wsProtocol: useProd ? 'wss://' : 'ws://',
  wsPort: useProd ? '' : ':3535',
  ipHost: useProd ? '54.200.31.197' : 'localhost',
  ipPort: ':3257',
  gaProductionId: '',
  controllers: [
    {
      name: 'kitchen',
      id: 'swi2.1',
    },
  ],
}
