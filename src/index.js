/* global Image */
const { get, set } = require('./components/storage')
const { requestJSON } = require('./components/request')
const getLatestVersion = require('./components/versions')
const setPlatformText = require('./components/platform')
const shuffle = require('./components/shuffle')
const bg = document.querySelector('.background-image')
const wikiAPI = 'https://en.wikipedia.org/w/api.php'
const wikiURL = `${wikiAPI}?action=parse&prop=text&page=Wikipedia:Featured%20pictures/Artwork/Paintings&format=json&origin=*`
const wikiErrTimeout = 5
const img = new Image()
const storedImages = get('images')
let wikiErrCount = 0

if (!storedImages || !storedImages.length) {
  requestJSON(wikiURL, onWikiError, onWikiLoad)
} else {
  setBackgroundImage(storedImages)
}

getLatestVersion()
setPlatformText()

function onWikiError () {
  if (++wikiErrCount > wikiErrTimeout) {
    return requestJSON(wikiURL, onWikiError, onWikiLoad)
  }
}

function onWikiLoad () {
  const template = document.createElement('template')
  template.innerHTML = this.response.parse.text['*']
  const imgs = template.content.querySelectorAll('.gallerybox img')
  const images = []
  for (let i = imgs.length - 1; i > -1; --i) {
    images.push(`https:${imgs[i].getAttribute('src')}`)
  }

  shuffle(images)
  return setBackgroundImage(images)
}

function setBackgroundImage (images) {
  const random = images.pop()
  img.onload = () => bg.setAttribute('style', `background-image:url("${img.src}")`)
  img.onerror = () => setBackgroundImage(images)
  img.src = random.replace(/[0-9]{3,4}px/, '2000px')
  return set('images', images)
}
