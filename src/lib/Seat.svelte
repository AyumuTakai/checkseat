<script lang="ts">
  export let no: number = 0;
  export let cx: number = 0;
  export let cy: number = 0;
  export let rx: number = 20;
  export let ry: number = 20;

  export let active: boolean = false;
</script>

<g class={active ? "active" : ""}>
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <ellipse {cx} {cy} {rx} {ry} pointer-events="all" on:click />
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <text
    x={cx}
    y={cy}
    on:click
    text-anchor="middle"
    dominant-baseline="central"
    font-size={rx + "px"}>{no}</text
  >
</g>

<style>
  g {
    --fill: var(--non-active-fill-light);
    --stroke: var(--non-active-stroke-light);
  }
  g.active {
    --fill: var(--active-fill-light);
    --stroke: var(--active-stroke-light);
  }
  ellipse {
    fill: var(--fill);
    stroke: var(--stroke);
  }
  text {
    stroke: var(--stroke);
    fill: var(--stroke);
  }
  text,
  ellipse {
    cursor: pointer;
  }
  @media (prefers-color-scheme: dark) {
    g {
      --fill: var(--non-active-fill-dark);
      --stroke: var(--non-active-stroke-dark);
    }
    g.active {
      --fill: var(--active-fill-dark);
      --stroke: var(--active-stroke-dark);
    }
  }
</style>
