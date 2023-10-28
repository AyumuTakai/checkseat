<script lang="ts">
  export let x: number;
  export let y: number;
  export let width: number;
  export let height: number;
  export let text: string = "";
</script>

<g>
  <rect {x} {y} {width} {height} pointer-events="all" />
  {#if text}
    <text
      x={x + width / 2}
      y={y + height / 2}
      font-family="Helvetica"
      font-size="12px"
      text-anchor="middle"
      dominant-baseline="central">{text}</text
    >
  {/if}
</g>

<style>
  rect {
    fill: white;
    stroke: black;
  }
  text {
    fill: black;
  }
  @media (prefers-color-scheme: dark) {
    rect {
      fill: black;
      stroke: white;
    }
    text {
      fill: black;
    }
  }
</style>
