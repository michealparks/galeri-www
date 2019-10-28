const request = (url, onload) => {
  const req = new window.XMLHttpRequest()
  req.open('GET', url, true)
  req.responseType = 'json'
  req.onload = onload
  req.send()
}

const getWikiJSON = () => {
  const wikiAPI = 'https://en.wikipedia.org/w/api.php'
  const wikiURL = `${wikiAPI}?action=parse&prop=text&page=Wikipedia:Featured%20pictures/Artwork/Paintings&format=json&origin=*`
  return request(wikiURL, function () {
    const template = document.createElement('template')
    template.innerHTML = this.response.parse.text['*']
    const imgs = template.content.querySelectorAll('.gallerybox img')
    const r1 = Math.floor(Math.random() * imgs.length)
    const r2 = Math.floor(Math.random() * imgs.length)
    const src1 = `https:${imgs[r1].src}`
    const src2 = `https:${imgs[r2].src}`
    setBackgroundImage(src1, 'background-image')
    setBackgroundImage(src2, 'section-2')
  })
}

const setBackgroundImage = (src, target) => {
  document.getElementById(target).style = `background-image:url("${src}")`
}

const getMacDownloadURL = (v) => {
  return `https://github.com/michealparks/galeri-www/releases/download/${v}/Galeri-${v}.dmg`
}

const getLatestVersion = () => {
  const url = 'https://api.github.com/repos/michealparks/galeri-www/releases/latest'
  return request(url, function () {
    const versionEl = document.getElementById('version')
    versionEl.href = this.response.html_url
    versionEl.textContent = 'Version ' + this.response.tag_name.slice(1)

    const macURL = getMacDownloadURL(this.response.tag_name)
    for (const el of document.querySelectorAll('.downloads')) {
      el.querySelector('#download-mac').href = macURL
    }
  })
}

getWikiJSON()
getLatestVersion()
