
// Keep in sync with utils
const isProd = process.env.NODE_ENV === 'production'
const isExternal = process.env.EXTERNAL_MODE === true || process.env.EXTERNAL_MODE === 'true'
const useProd = isProd || process.env.USE_PROD_API

let host = 'localhost'
if (useProd) {
  host = isExternal ? 'mechabus.jacobsmith.tech' : '10.0.0.4'
}

module.exports = {
  // Update this url in ./meta.config.js too. It saves a notable chunk from the bundles by doing it manually.
  productionHost: 'https://mechabus.jacobsmith.tech',
  frontendPort: 3015,
  host,
  httpProtocol: useProd ? 'https://' : 'http://',
  wsProtocol: useProd ? 'wss://' : 'ws://',
  wsPort: isProd ? '' : ':3535',
  ipHost: useProd ? 'ip-recorder.jacobsmith.tech' : 'localhost:3257',
  gaProductionId: '',
  controllers: [
    {
      name: 'kitchen',
      id: 'swi2.1',
    },
  ],
}
