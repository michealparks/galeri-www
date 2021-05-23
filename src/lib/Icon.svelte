<script lang='ts'>
  export let ariaLabel: string
  export let href: string
  export let id: string
</script>

<a aria-label={ariaLabel} target='_tab' {href}>
  <svg>
    <use xlink:href="#{id}"></use>
  </svg>
</a>

<style>
svg {
  margin: 10px 5px;
  border-radius: 30%;
  fill: #fff;
  stroke: #fff;
  transition: background-color 200ms, transform 200ms;
  transform: scale(0.95);
  box-shadow: -2px 8px 43px -2px rgba(0,0,0,0.74)
}

svg {
  width: 55px;
  height: 55px;
  padding: 16px;
  background-color: rgba(130,141,255,0.61);
}

svg:hover {
  background-color: rgba(130,141,255,0.8);
  transform: scale(1.04);
}
</style>