<script>
import Icon from "$lib/Icon.svelte"
import { versions } from "./stores";
</script>

<div class='downloads'>
  <Icon
    ariaLabel="install on mac"
    href={$versions.downloads?.mac}
    id='icon-appleinc'
  />
  <Icon
    ariaLabel="install on windows"
    href={$versions.downloads?.win}
    id='icon-windows'
  />
  <Icon
    ariaLabel="install on chrome"
    href='https://chrome.google.com/webstore/detail/galeri/mgpkakjlehkaoaneflejkcjbfmilgbao'
    id='icon-chrome'
  />
</div>