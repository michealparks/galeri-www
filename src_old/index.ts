const getWikiJSON = async () => {
  const wikiAPI = 'https://en.wikipedia.org/w/api.php'
  const wikiURL = `${wikiAPI}?action=parse&prop=text&page=Wikipedia:Featured%20pictures/Artwork/Paintings&format=json&origin=*`
  const response = await fetch(wikiURL)
  const json = await response.json()
  const template = document.createElement('template')
  template.innerHTML = json.parse.text['*']
  const imgs = template.content.querySelectorAll<HTMLImageElement>('.gallerybox img')
  const r1 = Math.floor(Math.random() * imgs.length)
  const r2 = Math.floor(Math.random() * imgs.length)
  setBackgroundImage(imgs[r1].src.replace(/[0-9]{3,4}px/, '2000px'), 'background-image')
  setBackgroundImage(imgs[r2].src.replace(/[0-9]{3,4}px/, '2000px'), 'section-2')
}

const setBackgroundImage = (src: string, target: string) => {
  document.getElementById(target)!.style.backgroundImage = `url("${src}")`
}

const getMacDownloadURL = (v: string) => {
  return `https://github.com/michealparks/galeri-www/releases/download/${v}/Galeri-${v}.dmg`
}

const getWinDownloadURL = (v: string) => {
  return `https://github.com/michealparks/galeri-www/releases/download/${v}Galeri-${v}.exe`
}

const getLatestVersion = async () => {
  const url = 'https://api.github.com/repos/michealparks/galeri-www/releases/latest'
  const response = await fetch(url)
  const json = await response.json()
  const versionEl = document.querySelector<HTMLAnchorElement>('#version')!
  versionEl.href = json.html_url
  versionEl.textContent = `Version ${json.tag_name.slice(1)}`

  const macURL = getMacDownloadURL(json.tag_name)
  const winURL = getWinDownloadURL(json.tag_name)

  for (const el of document.querySelectorAll('.downloads')) {
    el.querySelector('#download-mac').href = macURL
    el.querySelector('#download-win').href = winURL
  }
}

getWikiJSON()
getLatestVersion()
