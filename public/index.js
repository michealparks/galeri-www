/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/* global Image */
	var _require = __webpack_require__(4);

	var get = _require.get;
	var set = _require.set;

	var _require2 = __webpack_require__(1);

	var requestJSON = _require2.requestJSON;

	var getLatestVersion = __webpack_require__(5);
	var setPlatformText = __webpack_require__(2);
	var shuffle = __webpack_require__(3);
	var bg = document.querySelector('.background-image');
	var wikiAPI = 'https://en.wikipedia.org/w/api.php';
	var wikiURL = wikiAPI + '?action=parse&prop=text&page=Wikipedia:Featured%20pictures/Artwork/Paintings&format=json&origin=*';
	var wikiErrTimeout = 5;
	var img = new Image();
	var storedImages = get('images');
	var wikiErrCount = 0;

	if (!storedImages || !storedImages.length) {
	  requestJSON(wikiURL, onWikiError, onWikiLoad);
	} else {
	  setBackgroundImage(storedImages);
	}

	getLatestVersion();
	setPlatformText();

	function onWikiError() {
	  if (++wikiErrCount > wikiErrTimeout) {
	    return requestJSON(wikiURL, onWikiError, onWikiLoad);
	  }
	}

	function onWikiLoad() {
	  var template = document.createElement('template');
	  template.innerHTML = this.response.parse.text['*'];
	  var imgs = template.content.querySelectorAll('.gallerybox img');
	  var images = [];
	  for (var i = imgs.length - 1; i > -1; --i) {
	    images.push('https:' + imgs[i].getAttribute('src'));
	  }

	  shuffle(images);
	  return setBackgroundImage(images);
	}

	function setBackgroundImage(images) {
	  var random = images.pop();
	  img.onload = function () {
	    return bg.setAttribute('style', 'background-image:url("' + img.src + '")');
	  };
	  img.onerror = function () {
	    return setBackgroundImage(images);
	  };
	  img.src = random.replace(/[0-9]{3,4}px/, '2000px');
	  return set('images', images);
	}

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	function requestJSON(url, onerror, onload) {
	  var req = new window.XMLHttpRequest();
	  req.open('GET', url, true);
	  req.responseType = 'json';
	  req.onerror = onerror;
	  req.onload = onload;
	  return req.send();
	}

	module.exports = { requestJSON: requestJSON };

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	var text = {
	  'MacIntel': 'Mac',
	  'Win32': 'PC'
	}[navigator.platform];

	function setPlatformText() {
	  if (text) return Array.prototype.slice.call(document.getElementsByClassName('platform')).forEach(function (el) {
	    el.textContent = text;
	  });
	}

	module.exports = setPlatformText;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	function shuffle(array) {
	  for (var i = array.length - 1, j, t; i > 0; --i) {
	    j = Math.floor(Math.random() * (i + 1));
	    t = array[i];
	    array[i] = array[j];
	    array[j] = t;
	  }
	}

	module.exports = shuffle;

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	/* global localStorage */
	var noStore = !storageAvailable('localStorage');

	function storageAvailable(type) {
	  try {
	    var storage = window[type];
	    var x = '__storage_test__';
	    storage.setItem(x, x);
	    storage.removeItem(x);
	    return true;
	  } catch (e) {
	    return false;
	  }
	}

	function get(key) {
	  return noStore ? null : JSON.parse(localStorage.getItem(key));
	}

	function set(key, val) {
	  return noStore ? null : localStorage.setItem(key, JSON.stringify(val));
	}

	module.exports = { get: get, set: set };

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _require = __webpack_require__(1);

	var requestJSON = _require.requestJSON;

	var url = 'https://api.github.com/repos/michealparks/galeri-www/releases/latest';
	var versionEl = document.getElementById('version');
	var macDownload = document.getElementById('download-mac');

	function getMacDownloadURL(v) {
	  return 'https://github.com/michealparks/galeri-www/releases/download/' + v + '/Galeri-' + v + '.dmg';
	}

	function onVersionErr() {
	  console.log(this);
	}

	function onVersionLoad() {
	  versionEl.href = this.response.html_url;
	  versionEl.textContent = 'Version ' + this.response.tag_name.slice(1);
	  macDownload.href = getMacDownloadURL(this.response.tag_name);
	}

	function getLatestVersion() {
	  return requestJSON(url, onVersionErr, onVersionLoad);
	}

	module.exports = getLatestVersion;

/***/ }
/******/ ]);