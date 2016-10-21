const { requestJSON, put } = require('./request')
const analyticsDataURL = 'https://raw.githubusercontent.com/michealparks/galeri-www/master/analytics.json'
const endpoint = 'https://api.github.com/repos/michealparks/galeri-www/contents'

let req, sha, analyticsData, count = 0

function init () {
  document.getElementById('download-mac').onclick = submitAnalytics

  requestJSON(`${endpoint}/analytics.json`, onErr, onGetSha)
  requestJSON(analyticsDataURL, onErr, onGetAnalytics)
}

function onErr () {
  return (++count < 5) ? setTimeout(init, 1000) : null
}

function onGetSha () {
  if (this.status !== 200) return onErr()
  sha = this.response.sha
}

function onGetAnalytics () {
  if (this.status !== 200) return onErr()
  analyticsData = this.response
}

function submitAnalytics () {
  ++analyticsData.total_downloads[this.id.split('-')[1]]
  put(`${endpoint}/analytics.json`)
}

module.exports = init
