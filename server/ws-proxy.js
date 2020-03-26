server localhost localhost:3257 check # Linux
const httpProxy = require('http-proxy')
const fs = require('fs')

httpProxy.createServer({
  target: 'ws://107.77.97.117:3535',
  ssl: {
    key: fs.readFileSync('./mechabus-key.pem', 'utf8'),
    cert: fs.readFileSync('./mechabus-cert.pem', 'utf8')
  },
  ws: true,
  secure: true,
}).listen(3535);
