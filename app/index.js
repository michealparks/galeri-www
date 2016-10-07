(function () {
'use strict'

var wikiErrCount = 0
var wikiErrTimeout = 5

loadScripts([
  'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/localforage/1.4.3/localforage.nopromises.min.js'
], function () {
  if (document.readyState !== 'loading') return init()

  document.addEventListener('readystatechange', init)
})

function loadScripts (arr, callback) {
  var scriptCount = 0
  function onload () {
    if (++scriptCount === arr.length) callback()
  }
  
  for (var i = 0, l = arr.length; i < l; i++) {
    var script = document.createElement('script')
    script.async = true
    script.onload = onload
    script.src = arr[i]
    document.head.insertBefore(script, document.head.children[0])
  }
}

function init () {
  localforage.config({ name: 'galeri.io' })

  localforage.getItem('images', function(err, images) {
    console.log(err, images)
    if (err || !images || !images.length) return requestImages()

    setBackgroundImage(images)
  })
}

function requestImages () {
  var req = new XMLHttpRequest()
  req.open('GET', 'https://en.wikipedia.org/w/api.php?action=parse&prop=text&page=Wikipedia:Featured%20pictures/Artwork/Paintings&format=json&origin=*', true)
  req.responseType = 'json'

  req.onerror = function onWikipediaError (err) {
    console.log(req, err)
    if (++wikiErrCount > wikiErrTimeout) init()
  }
  
  req.onload = function onWikipediaResponse () {
    var images = Array.prototype.slice.call(
      $($.parseHTML(req.response.parse.text['*']))
        .find('.gallerybox img').map(function (i, img) {
          return img.src
        })
    )
    
    setBackgroundImage(images)
    localforage.setItem('images', images)
  }
  
  req.send()
}

function setBackgroundImage (images) {
  var random = images[Math.round(Math.random() * images.length - 1)]
  
  const img = new Image()
  
  img.onload = function () {
    document.querySelector('.background-image')
      .style.backgroundImage = 'url("' + img.src + '")'
  }
  
  img.onerror = function () {
    setBackgroundImage(images)
  }
  
  img.src = random.replace(/[0-9]{3,4}px/, '2000px')

  
}

})()

