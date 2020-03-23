const description = 'The control panel for Das Mechabus. Manage electrical systems and read resource levels.' // eslint-diable-line max-len
const color = '#557c9b'
const source = 'https://mechabus.jacobsmith.tech/images/logo-og.png'
// NOTE: This file is included in client. Don't put secrets in here. They go in keys.js

const siteMeta = {
  name: 'Das Mechabus',
  short_name: 'Mechabus', // eslint-disable-line camelcase
  title: 'Das Mechabus | The Nerve Center 🚌',
  author: 'Jacob Smith',
  display: 'standalone',
  start_url: '/', // eslint-disable-line camelcase
  // Keep in sync with config.js
  host: 'https://mechabus.jacobsmith.tech',
  description,
  color,
  og: {
    description,
    image: {
      src: source,
      width: '279',
      height: '279',
    },
    type: 'website',
  },
  twitter: {
    creator: '@limeandcoconut',
    image: {
      src: source,
      alt: 'TODO',
    },
    card: 'summary',
  },
  ms: {
    color,
  },
  manifest: '/dist/manifest.json',
  favicons: [
    {
      src: '/favicon.ico',
      key: 'default',
    },
    {
      src: '/dist/meta/favicon-32x32.png',
      key: 'x32',
    },
    {
      src: '/dist/meta/favicon-16x16.png',
      key: 'x16',
    },
    {
      src: '/dist/meta/mstile-150x150.png',
      key: 'ms',
    },
    {
      src: '/dist/meta/apple-touch-icon.png',
      key: 'apple',
    },
    {
      src: '/dist/meta/safari-pinned-tab.svg',
      key: 'safariMask',
    },
  ],
  // These are joined with paths.sharedMeta in webpack so that
  // path, paths, and subsequently fs are not included on client where this is used
  // This is used by webpack to copy assets which aren't required in
  copyMeta: [
    {
      name: '/favicon.ico',
      from: 'icons',
      to: 'proxy_to_site_root/',
    },
    {
      name: '/favicon-32x32.png',
      from: 'icons',
      to: 'meta',
    },
    {
      name: '/favicon-16x16.png',
      from: 'icons',
      to: 'meta',
    },
    {
      name: '/mstile-150x150.png',
      from: 'icons',
      to: 'meta',
    },
    {
      name: '/apple-touch-icon.png',
      from: 'icons',
      to: 'meta',
    },
    {
      name: '/safari-pinned-tab.svg',
      from: 'icons',
      to: 'meta',
    },
    {
      name: '/logo-og.png',
      from: 'images',
      to: 'meta',
    },
    {
      name: '/browserconfig.xml',
      from: 'icons',
      to: 'proxy_to_site_root/',
    },
  ],
  // Used in asset generation
  manifestIcons: [
    {
      src: '/android-chrome-512x512.png',
      sizes: [72, 96, 128, 144, 152, 192, 384, 512],
      destination: '/meta',
    },
  ],
  // Wonder if it would be worth pulling from package.json
  cacheBust: '?v=0',
}

// Cache cacheBust
// C-C-C-COMBO BREAKER!
siteMeta.favicons = siteMeta.favicons.reduce((favicons, { key, src: source }) => {
  favicons[key] = source + siteMeta.cacheBust
  return favicons
}, {})
siteMeta.manifest += siteMeta.cacheBust
siteMeta.twitter.image.src += siteMeta.cacheBust
siteMeta.og.image.src += siteMeta.cacheBust

module.exports = siteMeta
