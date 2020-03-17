module.exports = {
  isDev: () => process.env.NODE_ENV === 'development',
  isProd: () => process.env.NODE_ENV === 'production',
  sleep: time => new Promise(resolve => setTimeout(resolve, time)),
}

