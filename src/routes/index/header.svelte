<script>
import Background from '$lib/Background.svelte'
import { versions } from "$lib/stores"
import Downloads from "$lib/Downloads.svelte"
</script>

<header>
  <Background />

  <div>
    <h1>Galeri</h1>
    <p>A perpetual artwork streaming machine.</p>

    <Downloads />
  </div>

  <small class='version'>
    <a id='version' target='_tab' href={$versions.href || ''}>{$versions.tag || ''}</a>
  </small>

  <svg class="see-more icon-arrow-down">
    <use xlink:href="#icon-arrow-down"></use>
  </svg>

  <small class='issues'>
    <a href='https://github.com/michealparks/galeri-www/issues' target='_tab'>
      <span class='icon-github'></span>
      Report an issue
    </a>
  </small>
</header>

<style>
header {
  height: 100vh;
  display: grid;
  place-items: center;
  place-content: center;
  color: #fff;
  font-family: 'Reem Kufi';
  text-align: center;
}


h1 {
  margin: 0;
  font-weight: 300;
  line-height: 1;
}

p {
  margin: 0;
  font-size: 1.2em;
}

header .version,
header .issues,
header .see-more {
  position: absolute;
  bottom: 20px;
  font-size: 17px;
}

.version {
  left: 20px;
}

.see-more {
  left: calc(50% - 13px);
  fill: #fff;
  stroke: #fff;
  height: 26px;
  width: 26px;
}

.issues {
  right: 20px;
}

</style>