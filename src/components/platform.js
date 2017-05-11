module.exports = setPlatformText

function setPlatformText () {
  const text = {
    'MacIntel': 'Mac',
    'Win32': 'PC'
  }[navigator.platform]

  if (!text) return

  const els = [].slice.call(document.getElementsByClassName('platform'))

  for (let i = 0, l = els.length; i < l; ++i) {
    els[i].textContent = text
  }
}
