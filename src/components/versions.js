const { requestJSON } = require('./request')
const url = 'https://api.github.com/repos/michealparks/galeri-www/releases/latest'
const versionEl = document.getElementById('version')
const downloads = document.getElementsByClassName('downloads')

function getMacDownloadURL (v) {
  return `https://github.com/michealparks/galeri-www/releases/download/${v}/Galeri-${v}.dmg`
}

function onVersionErr () {

}

function onVersionLoad () {
  versionEl.href = this.response.html_url
  versionEl.textContent = `Version ${this.response.tag_name.slice(1)}`

  const macURL = getMacDownloadURL(this.response.tag_name)

  for (let i = 0, d, l = downloads.length; i < l; ++i) {
    d = downloads[i]
    d.querySelector('#download-mac').href = macURL
  }
}

function getLatestVersion () {
  return requestJSON(url, onVersionErr, onVersionLoad)
}

module.exports = getLatestVersion
