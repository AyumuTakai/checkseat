<script lang="ts">
  export let x: number;
  export let y: number;
  export let width: number;
  export let height: number;
  export let text: string = "";
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<g on:pointerup on:pointerdown>
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
    fill: var(--fill, none);
    stroke: var(--stroke, black);
  }
  text {
    fill: var(--stroke, black);
    user-select: none;
  }
  @media (prefers-color-scheme: dark) {
    rect {
      fill: var(--fill-dark, none);
      stroke: var(--stroke-dark, white);
    }
    text {
      fill: var(--stroke-dark, white);
    }
  }
</style>
