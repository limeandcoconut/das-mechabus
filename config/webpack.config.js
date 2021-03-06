const path = require('path')

// Core Deps required for packing
const webpack = require('webpack')
const HTMLPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const MinifyPlugin = require('babel-minify-webpack-plugin')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const { GenerateSW } = require('workbox-webpack-plugin')
const WebpackBuildNotifierPlugin = require('webpack-build-notifier')
const WebpackPwaManifest = require('webpack-pwa-manifest')
const CopyPlugin = require('copy-webpack-plugin')
const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin')
const SitemapPlugin = require('sitemap-webpack-plugin').default // 😬
const RobotstxtPlugin = require('robotstxt-webpack-plugin')

// Dev tools
const Visualizer = require('webpack-visualizer-plugin')

const siteMeta = require('./meta.config.js')
const { productionHost } = require('../config/config.js')

const isProd = require('../client/utils').isProd()

const config = {
  mode: isProd ? 'production' : 'development',
  entry: {
    app: './client/entry-client.js',
  },
  output: {
    path: path.resolve(__dirname, '../', 'dist'),
    publicPath: '/dist/',
    filename: '[name]-bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.vue$/,
        use: 'vue-loader',
      },
      {
        test: /\.less$/,
        use: [
          'vue-style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: !isProd,
              // This make css-loader skip inlining fonts (a good choice since
              // these are intended as backups)
              url: url => !/\/fonts\/.*\.woff2/.test(url),
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [require('autoprefixer')],
              },
            },
          },
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                // Look into this if you have problems with nested relative urls
                // relativeUrls: false,
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.USE_PROD_API': process.env.USE_PROD_API,
      'process.env.EXTERNAL_MODE': process.env.EXTERNAL_MODE,
    }),
    new CaseSensitivePathsPlugin(),
    new VueLoaderPlugin(),
    new HTMLPlugin({
      template: 'client/index.template.html',
      // Inject false turns off automatic injection of Css and JS
      inject: true,
    }),
    new FriendlyErrorsWebpackPlugin(),
  ],
  optimization: {},
  stats: {
    cached: false,
    cachedAssets: false,
    chunks: false,
    chunkModules: false,
    colors: true,
    hash: false,
    modules: false,
    reasons: false,
    timings: true,
    version: false,
    warnings: true,
    children: false,
  },
}

if (isProd) {
  // This automatically takes care of vendor splitting
  config.optimization.splitChunks = {
    cacheGroups: {
      vendor: {
        test: /[/\\]node_modules[/\\]/,
        chunks: 'initial',
        // chunks: 'all',
        name: 'vendor',
        enforce: true,
      },
    },
  }

  // Add Compression plugins and service worker caching
  config.plugins.push(
    new Visualizer({ filename: '../stats.html' }),
    new MinifyPlugin(),
    new CompressionPlugin({
      filename: '[path].br[query]',
      test: /\.js$|\.css$/,
      algorithm: 'brotliCompress',
      compressionOptions: { level: 11 },
    }),
    // It'd be best to read the options for this and cater to specific project needs
    // https://developers.google.com/web/tools/workbox/guides/generate-service-worker/webpack
    // https://developers.google.com/web/tools/workbox/reference-docs/latest/module-workbox-webpack-plugin.GenerateSW#GenerateSW
    new GenerateSW({
      // This will interpret a leading slash as root
      swDest: path.join('proxy_to_site_root', '/service-worker.js'),
      // If false a separate runtime will be generated and needs to be served in parallel
      inlineWorkboxRuntime: true,
      runtimeCaching: [{
        urlPattern: /.*/,
        handler: 'NetworkFirst',
        // Options:
        // cacheFirst
        // fastest
        // networkOnly
        // cacheOnly
        // Why u no slowest?
      }],
      include: [
        /dist\/.*\.css/,
        /dist\/img\/.*/,
        /dist\/.*\.js/,
        // TODO: cache fonts?
      ],
      // Don't allow the service worker to try to cache google analytics or your tracking will stop working
      // Disable any other scripts you don't want cached here as well
      exclude: [/google-analytics.com/],
    }),
    // These paths are joined here so that
    // path, paths, and subsequently fs are not included on client where this is use
    new WebpackPwaManifest({
      name: siteMeta.name,
      short_name: siteMeta.short_name, // eslint-disable-line camelcase
      description: siteMeta.description,
      background_color: siteMeta.color, // eslint-disable-line camelcase
      theme_color: siteMeta.color, // eslint-disable-line camelcase
      // crossorigin: 'use-credentials', // can be null, use-credentials or anonymous
      icons: siteMeta.manifestIcons.map(({ src: source, ...rest }) => {
        return {
          src: path.join('public/icons', source),
          ...rest,
        }
      }),
      filename: 'manifest.json',
      display: siteMeta.display,
      start_url: siteMeta.start_url, // eslint-disable-line camelcase
      inject: false,
      fingerprints: false,
      ios: false,
      includeDirectory: false,
    }),
    // Copy icons and other assets
    new CopyPlugin(siteMeta.copyMeta.map(({ from = '', to, name }) => {
      return {
        from: path.join(__dirname, '../public', from, name),
        to,
      }
    })),
    new DuplicatePackageCheckerPlugin({
      // Also show module that is requiring each duplicate package (default: false)
      verbose: true,
      // Emit errors instead of warnings (default: false)
      // emitError: true,
    }),
    // Write sitemap
    new SitemapPlugin(productionHost, [
      {
        path: '/',
        priority: 1,
      },
      {
        path: '/404',
        priority: 0,
      },
    ], {
      // Last update is now
      lastMod: true,
      skipGzip: true,
      fileName: path.join('proxy_to_site_root', 'sitemap.xml'),
    }),
    // Write robots
    new RobotstxtPlugin({
      policy: [
        {
          userAgent: '*',
          disallow: '/',
        },
      ],
      sitemap: path.join(productionHost, 'sitemap.xml'),
      host: productionHost,
      filePath: path.join('proxy_to_site_root', 'robots.txt'),
    }),
  )
} else {
  // config.devtool = 'cheap-module-eval-source-map'
  config.devtool = 'source-map'
  // config.devtool = 'cheap-eval-source-map'
  // config.devtool = 'eval'

  config.plugins.push(
    new webpack.NoEmitOnErrorsPlugin(),
    new WebpackBuildNotifierPlugin({
      title: 'Webpack Client Build',
      suppressSuccess: true,
    }),
  )
}

module.exports = config
