/* global Image */
const storage = require('./components/storage')
const request = require('./components/request')
const getLatestVersion = require('./components/versions')
const setPlatformText = require('./components/platform')
const shuffle = require('./components/shuffle')
const storedImages = storage.get('images')
const wikiErrTimeout = 5
let wikiErrCount = 0

if (storedImages === null || storedImages.length === 0) {
  getWikiJSON()
} else {
  setBackgroundImage(storedImages, 'background-image', function () {
    setBackgroundImage(storedImages, 'section-2')
  })
}

getLatestVersion()
setPlatformText()

function getWikiJSON () {
  const wikiAPI = 'https://en.wikipedia.org/w/api.php'
  const wikiURL = wikiAPI + '?action=parse&prop=text&page=Wikipedia:Featured%20pictures/Artwork/Paintings&format=json&origin=*'

  return request(wikiURL, onWikiError, onWikiLoad)
}

function onWikiError () {
  if (++wikiErrCount > wikiErrTimeout) {
    return getWikiJSON()
  }
}

function onWikiLoad () {
  const template = document.createElement('template')
  template.innerHTML = this.response.parse.text['*']
  const imgs = template.content.querySelectorAll('.gallerybox img')
  const images = []
  for (let i = imgs.length - 1; i > -1; --i) {
    images.push('https:' + imgs[i].getAttribute('src'))
  }

  shuffle(images)

  setBackgroundImage(images, 'background-image', function () {
    setBackgroundImage(images, 'section-2')
  })
}

function setBackgroundImage (images, target, next) {
  const random = images.pop()
  const img = new Image()

  img.onload = function () {
    document.getElementById(target)
      .setAttribute('style', 'background-image:url("' + img.src + '")')
  }

  img.onerror = function () {
    setBackgroundImage(images, target)
  }

  img.src = random.replace(/[0-9]{3,4}px/, '2000px')

  storage.set('images', images)

  if (next) next()
}
