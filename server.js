'use strict'

const { join } = require('path')
const express = require('express')
const app = express()

app.use('/', express.static(join(__dirname, 'public')))
app.listen('1961', () => console.log(`Server listening on port 1961`))
