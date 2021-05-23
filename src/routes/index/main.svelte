<script>
import Background from "$lib/Background.svelte"
</script>

<main>
  <section>
    <div class='block'>
      <h2>Galeri turns your <span class='platform'>computer</span>'s background into an art exhibit.</h2>

      <p>Think of Galeri as your own dutiful curator, quietly replacing your desktop background throughout the day
        with a steady stream of fresh artwork: regionally and globally sourced, prehistoric to modern, cage-free and
        organic, from museums and other archives around the world.</p>

      <p>If you're looking for little inspirations throughout the day, want to learn more about art history, or are
        just bored with having to choose your <span class='platform'>computer</span>'s background, then you may like
        what you get when you give Galeri a shot.</p>
    </div>
    <div class='img-container block'>
      <img src='screenshot.jpeg' alt='Galeri Screenshot' />
    </div>
  </section>

  <section class='section--bg-image'>
    <Background delay={1500} />
    <div class='background-mask'></div>
    <div class='block block--lg'>
      <h2>Galeri is in <i>early</i> Beta.</h2>
      <p>We've only begun work on Galeri but would love for people to start trying it out! Let us know about new use
        cases (perhaps like hacking together a raspberry pi and a display mounted on an ornate frame to make an
        ever-changing painting?). We'd also love to hear about any of your ideas or issues on our <a
          href='https://github.com/michealparks/galeri-www/issues' target='_tab'>Github</a>.</p>
    </div>
  </section>

  <section class='section'>
    <div class='block block-lg'>
      <h2>No Cost, Low Footprint.</h2>
      <p>Galeri is (obviously) free, and always will be. It aims to follow the spirit of its sources by never putting
        up any sort of gateway or obstacle between you and something that should never be used for profit.</p>

      <p>We've engineered Galeri with performance in mind and designed it so that it'll never get in the way of your
        day to day. Let it hang out in the background and occasionally surprise you.</p>
    </div>
  </section>
</main>

<style>
section {
  position: relative;
  display: flex;
  place-content: center;
  padding: 40px 20px;
}

@media(max-width: 830px) {
  section {
    display: block;
  }
}

section:nth-child(2n) {
  padding: 80px 20px;
}

h2 {
  margin: 15px 0;
}

.block {
  max-width: 500px;
  margin: 20px;
}

.block-lg {
  max-width: 800px;
}

.img-container {
  display: grid;
  place-content: center;
  perspective: 500px;
}

.img-container img {
  width: 100%;
  max-width: 500px;
  border-radius: 4px;
  transform: rotateX(-10deg) rotateY(-15deg);
  box-shadow: -2px 24px 43px -14px rgba(0,0,0,1);
}

</style>