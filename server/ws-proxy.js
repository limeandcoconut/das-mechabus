const url = require('url')
const WebSocket = require('ws')
const HttpsProxyAgent = require('https-proxy-agent')

// HTTP/HTTPS proxy to connect to
const proxy = process.env.http_proxy || 'http://localhost:3535'
console.log('using proxy server %j', proxy)

// WebSocket endpoint for the proxy to connect to
const endpoint = 'wss://107.77.97.117:3535'
console.log('attempting to connect to WebSocket %j', endpoint)

// create an instance of the `HttpsProxyAgent` class with the proxy server information
const options = url.parse(proxy)

const agent = new HttpsProxyAgent(options)

// finally, initiate the WebSocket connection
const socket = new WebSocket(endpoint, { agent: agent })

socket.on('open', function() {
  console.log('"open" event!')
  socket.send('hello world')
})

socket.on('message', function(data, flags) {
  console.log('"message" event! %j %j', data, flags)
  socket.close()
})
