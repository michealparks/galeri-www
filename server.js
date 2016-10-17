'use strict'

const { join } = require('path')
const express = require('express')
const morgan = require('morgan')
const app = express()

app.use(morgan('combined'))

app.use('/', express.static(join(__dirname, 'public')))

app.listen('1961', function () {
  console.log(`Server listening on port 1961`)
})
