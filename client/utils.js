
const {
  title,
  author,
  description,
  color,
  ms,
  manifest,
  favicons,
} = require('../config/meta.config')
const {
  wsProtocol,
  host,
  wsPort,
  httpProtocol,
  ipHost,
} = require('../config/config.js')

const getIP = url => new Promise((resolve, reject) =>
  fetch(url)
  .then((response) => {
    response.text().then((text) => {
      console.log(text)
      return resolve(text)
    })
  })
  .catch((error) => {
    console.log(error)
    return reject(error)
  }),
)

const wsEndpoint = `${wsProtocol}${host}${wsPort}`
const isProd = () => process.env.NODE_ENV === 'production'
const isExternal = () => process.env.EXTERNAL_MODE === true || process.env.EXTERNAL_MODE === 'true'

console.log(process.env.EXTERNAL_MODE)

const defaultMeta = {
  title,
  meta: [
    { name: 'description', content: description },
    { name: 'author', content: author },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { name: 'theme-color', content: color },
    { name: 'msapplication-TileImage', content: favicons.ms },
    { name: 'msapplication-TileColor', content: ms.color },
    { name: 'robots', content: 'noindex, nofollow' },
  ],
  link: [
    { rel: 'shortcut icon', href: favicons.default },
    { rel: 'icon', href: favicons.x32, sizes: '32x32', type: 'image/png' },
    { rel: 'icon', href: favicons.x16, sizes: '16x16', type: 'image/png' },
    { rel: 'apple-touch-icon', href: favicons.apple, sizes: '180x180' },
    { rel: 'mask-icon', href: favicons.safariMask, color: color },
    { rel: 'icon', href: favicons.ms },
  ],
}

if (isProd()) {
  defaultMeta.link.push({ rel: 'manifest', href: manifest })
}

module.exports = {
  isDev: () => process.env.NODE_ENV === 'development',
  isProd,
  sleep: time => new Promise(resolve => setTimeout(resolve, time)),
  defaultMeta,
  extendMeta: (meta) => {
    const final = { ...defaultMeta }
    final.meta = [
      ...defaultMeta.meta,
      ...meta.meta,
    ]
    final.link = [
      ...defaultMeta.link,
      ...meta.link,
    ]
    final.title = defaultMeta.title || title
    return final
  },
  decodeJWT: jwt => JSON.parse(Buffer.from(jwt.split('.')[1], 'base64').toString('utf-8')),
  getEndpoint: async () => {
    console.log(isExternal())
    console.log('test')
    if (!isExternal()) {
      return wsEndpoint
    }

    let ip
    try {
      ip = await getIP(`${httpProtocol}${ipHost}`)
    } catch (error) {
      console.log(error)
    }
    return `${wsProtocol}${ip}${wsPort}`
  },
}

