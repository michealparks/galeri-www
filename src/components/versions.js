module.exports = getLatestVersion

const request = require('./request')

function getMacDownloadURL (v) {
  return 'https://github.com/michealparks/galeri-www/releases/download/' +
    v +
    '/Galeri-' +
    v +
    '.dmg'
}

function onVersionErr () {

}

function onVersionLoad () {
  const versionEl = document.getElementById('version')
  const downloads = document.getElementsByClassName('downloads')

  versionEl.href = this.response.html_url
  versionEl.textContent = 'Version ' + this.response.tag_name.slice(1)

  const macURL = getMacDownloadURL(this.response.tag_name)

  for (let i = 0, d, l = downloads.length; i < l; ++i) {
    d = downloads[i]
    d.querySelector('#download-mac').href = macURL
  }
}

function getLatestVersion () {
  const url = 'https://api.github.com/repos/michealparks/galeri-www/releases/latest'

  return request(url, onVersionErr, onVersionLoad)
}
