const { requestJSON } = require('./request')
const url = 'https://api.github.com/repos/michealparks/galeri-www/releases/latest'
const versionEl = document.getElementById('version')
const macDownload = document.getElementById('download-mac')

function getMacDownloadURL (v) {
  return `https://github.com/michealparks/galeri-www/releases/download/${v}/Galeri-${v}.dmg`
}

function onVersionErr () {
  console.log(this)
}

function onVersionLoad () {
  versionEl.href = this.response.html_url
  versionEl.textContent = `Version ${this.response.tag_name.slice(1)}`
  macDownload.href = getMacDownloadURL(this.response.tag_name)
}

function getLatestVersion () {
  return requestJSON(url, onVersionErr, onVersionLoad)
}

module.exports = getLatestVersion
