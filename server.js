'use strict'

const { join } = require('path')
const express = require('express')
const morgan = require('morgan')
const latest = '0.1.0'
const baseURL = process.env.NODE_ENV === 'development'
  ? 'http://localhost:3000'
  : 'https://galeri.io'

const app = express()

app.use(morgan('combined'))

app.use('/', express.static(join(__dirname, 'app')))
app.use('/releases', express.static(join(__dirname, 'releases')))

app.get('updates/latest', function (req, res) {
  const clientVersion = req.query.v

  return clientVersion === latest
    ? res.status(204).end()
    : res.json({ url: `${baseURL}/releases/darwin/${latest}/Galeri.zip` })
})

app.listen(process.env.PORT, function () {
  console.log(`Server listening on port ${process.env.PORT}`)
})
