/* eslint-disable global-require */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-var-requires */
const express = require('express')
const next = require('next')
const { createProxyMiddleware } = require('http-proxy-middleware')

const devProxy = {
  target: 'http://localhost:8080/v1/graphql',
  pathRewrite: { '^/graphql': '' },
  changeOrigin: true,
}

const port = Number.parseInt(process.env.PORT, 10) || 3000
const app = next({
  dir: '.',
  dev: true,
})

const handle = app.getRequestHandler()

let server
app
  .prepare()
  .then(() => {
    server = express()

    server.use(createProxyMiddleware('/graphql', devProxy))

    server.all('*', (req, res) => handle(req, res))

    server.listen(port, '0.0.0.0', err => {
      if (err) {
        throw err
      }
      console.log(`\n→ http://localhost:${port}\n`)
    })
  })
  .catch(error => {
    console.log('An error occurred, unable to start the server')
    console.log(error)
  })
