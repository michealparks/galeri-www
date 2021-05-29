<script lang='ts'>
  import { images } from "$lib/stores"
  import { randInt } from '$lib/util'
  import { onMount } from "svelte"

  export let delay = 0
  let ready = false
  let src

  onMount(() => {
    setTimeout(() => {
      const img = new Image()

      img.onload = () => {
        ready = true
        src = img.src
      }

      images.subscribe(value => {
        const str = value[randInt(0, $images.length)]

        if (str) img.src = str
      })
    }, delay)
  })
</script>

<div
  class:ready
  class='bg-image'
  style={src ? `background-image:url(${src})` : undefined}
/>
<div class='bg-mask' />

<style>
.bg-image,
.bg-mask {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}

.bg-image {
  background-size: cover;
  background-position: center;
  opacity: 0;
  transition: 600ms;
  z-index: -2;
}

.bg-mask {
  background-color: rgba(0,0,0,0.45);
  z-index: -1;
}

.ready {
  opacity: 1;
}
</style>