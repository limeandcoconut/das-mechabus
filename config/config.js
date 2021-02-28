
// Keep in sync with utils
const isProd = process.env.NODE_ENV === 'production'
const isExternal = process.env.EXTERNAL_MODE === true || process.env.EXTERNAL_MODE === 'true'
const useProd = isProd || process.env.USE_PROD_API

const wsProtocol = useProd ? 'wss://' : 'ws://'
let host = 'localhost'
if (useProd) {
  host = isExternal ? 'mechabus.jacobsmith.tech' : 'das-mechabus.jacobsmith.tech'
}

const wsPort = isProd ? '' : ':3535'

module.exports = {
  // Update this url in ./meta.config.js too. It saves a notable chunk from the bundles by doing it manually.
  productionHost: `https://${host}`,
  frontendPort: 3015,
  wsEndpoint: `${wsProtocol}${host}${wsPort}`,
  gaProductionId: '',
  controllers: [
    {
      name: 'kitchen',
      id: 'swi2.1',
    },
    {
      name: 'living',
      id: 'swi1.1',
    },
    {
      name: 'bath',
      id: 'swi5.1',
    },
    {
      name: 'bed',
      id: 'swi5.2',
    },
    {
      name: 'dump',
      id: 'dump',
    },
    {
      name: 'fill',
      id: 'fill',
    },
    {
      name: 'pump',
      id: 'pump',
    },
  ],
}
