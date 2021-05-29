<script lang='ts'>
  export let ariaLabel: string
  export let href: string
  export let id: string
</script>

<a aria-label={ariaLabel} target='_tab' {href}>
  <svg>
    <use xlink:href='#{id}'></use>
  </svg>
</a>

<style lang='scss'>
svg {
  width: 55px;
  height: 55px;
  padding: 16px;
  margin: 10px 5px;
  border-radius: 30%;
  fill: #fff;
  stroke: #fff;
  background-color: rgba(130,141,255,0.61);
  transition: background-color 200ms, transform 200ms;
  transform: scale(0.95);

  &:hover {
    background-color: rgba(130,141,255,0.8);
    transform: scale(1.04);
  }
}
</style>