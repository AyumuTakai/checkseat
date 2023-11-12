<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { screenToSvg } from "./SelectionHandleSVG.svelte";

  export let x: number;
  export let y: number;

  export let anchorSize: number = 16;
  export let stroke: string = "black";
  export let fill: string = "white";

  const dispatcher = createEventDispatcher();

  let dragging: boolean = false;

  const pointerdownHandler = (ev: PointerEvent) => {
    fill = "white";
    const rect = ev.target as SVGRectElement;
    const bbox = rect.getBBox();
    dragging = true;
    (ev.target as SVGElement).setPointerCapture(ev.pointerId);
    const pt = screenToSvg(
      { x: ev.clientX, y: ev.clientY },
      ev.target as SVGGeometryElement
    );
  };
  const pointermoveHandler = (ev: PointerEvent) => {
    if (dragging) {
      const pt = screenToSvg(
        { x: ev.clientX, y: ev.clientY },
        ev.target as SVGGeometryElement
      );
      dispatcher("move", { x: pt.x, y: pt.y });
    }
  };
  const pointerupHandler = (ev: PointerEvent) => {
    dragging = false;
  };
</script>

<rect
  x={x - anchorSize / 2}
  y={y - anchorSize / 2}
  width={anchorSize}
  height={anchorSize}
  class="anchor"
  {stroke}
  {fill}
  on:pointerdown={pointerdownHandler}
  on:pointermove={pointermoveHandler}
  on:pointerup={pointerupHandler}
/>

<style>
  rect {
    cursor: var(--cursor, move);
  }
</style>
