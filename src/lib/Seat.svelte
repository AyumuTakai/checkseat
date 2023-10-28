<script lang="ts">
  import { createEventDispatcher } from "svelte";

  const dispatcher = createEventDispatcher();

  export let no: number = 0;
  export let cx: number = 0;
  export let cy: number = 0;
  export let rx: number = 20;
  export let ry: number = 20;

  let el: SVGEllipseElement;

  export let stroke: string = "black";
  export let fill: string = "white";
  export let strokeDark: string = "white";
  export let fillDark: string = "black";
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<g
  pointer-events="all"
  on:click|preventDefault={(ev) => {
    dispatcher("click", ev);
  }}
  style="--stroke:{stroke};--fill:{fill};--strokeDark:{strokeDark};--fillDark:{fillDark}"
>
  <ellipse {cx} {cy} {rx} {ry} bind:this={el} />
  <text x={cx} y={cy} text-anchor="middle" dominant-baseline="central"
    >{no}</text
  >
</g>

<style>
  ellipse {
    stroke: var(--stroke);
    fill: var(--fill);
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
    ellipse {
      stroke: var(--strokeDark);
      fill: var(--fillDark);
    }
    text {
      /* stroke-width: 3; */
      stroke: var(--strokeDark);
      fill: var(--strokeDark);
      paint-order: stroke;
      font-weight: bold;
      stroke-linejoin: round;
    }
  }
</style>
