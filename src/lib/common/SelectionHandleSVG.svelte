<script lang="ts" context="module">
  export interface ScalableObject {
    left: number;
    top: number;
    right: number;
    bottom: number;
    key: string;
    update(v: { left: number; top: number; right: number; bottom: number });
  }

  export function screenToSvg(point, el: SVGGeometryElement) {
    const pt = new DOMPoint(point.x, point.y);
    return pt.matrixTransform(el.getScreenCTM().inverse());
  }
</script>

<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import AnchorPointSVG from "./AnchorPointSVG.svelte";

  const dispatcher = createEventDispatcher();

  export let active: boolean = false;
  export let resizable: boolean = true;
  export let movable: boolean = true;

  export let target: ScalableObject;

  let dragging: boolean = false;

  let top = 0;
  let left = 0;
  let right = 0;
  let bottom = 0;

  let padding: number = 8;
  let half_pad: number = padding / 2;

  let offset: { x: number; y: number } = { x: 0, y: 0 };

  $: {
    if (target) {
      top = target.top - half_pad;
      left = target.left - half_pad;
      right = target.right + half_pad;
      bottom = target.bottom + half_pad;
    }
  }

  const lefttopHandler = (ev: CustomEvent) => {
    if (resizable) {
      const { x, y } = ev.detail;
      dispatcher("update", {
        top: y + half_pad,
        left: x + half_pad,
        right: right - half_pad,
        bottom: bottom - half_pad,
      });
    }
  };
  const righttopHandler = (ev: CustomEvent) => {
    if (resizable) {
      const { x, y } = ev.detail;
      dispatcher("update", {
        top: y + half_pad,
        left: left + half_pad,
        right: x - half_pad,
        bottom: bottom - half_pad,
      });
    }
  };
  const leftbottomHandler = (ev: CustomEvent) => {
    if (resizable) {
      const { x, y } = ev.detail;
      dispatcher("update", {
        top: top + half_pad,
        left: x + half_pad,
        right: right - half_pad,
        bottom: y - half_pad,
      });
    }
  };
  const rightbottomHandler = (ev: CustomEvent) => {
    if (resizable) {
      const { x, y } = ev.detail;
      dispatcher("update", {
        top: top + half_pad,
        left: left + half_pad,
        right: x - half_pad,
        bottom: y - half_pad,
      });
    }
  };

  const pointerdownHandler = (ev: PointerEvent) => {
    const rect = ev.target as SVGRectElement;
    const bbox = rect.getBBox();

    dragging = true;
    (ev.target as SVGElement).setPointerCapture(ev.pointerId);
    const pt = screenToSvg(
      { x: ev.clientX, y: ev.clientY },
      ev.target as SVGGeometryElement
    );
    offset = { x: ev.offsetX, y: ev.offsetY };
    offset = { x: pt.x - bbox.x, y: pt.y - bbox.y };
  };
  const pointermoveHandler = (ev: PointerEvent) => {
    if (dragging && movable) {
      const pt = screenToSvg(
        { x: ev.clientX, y: ev.clientY },
        ev.target as SVGGeometryElement
      );
      left = pt.x - offset.x + half_pad;
      top = pt.y - offset.y + half_pad;
      dispatcher("update", { top, left });
    }
  };
  const pointerupHandler = (ev: PointerEvent) => {
    dragging = false;
  };
</script>

<slot />
{#if target && active}
  <g>
    <!-- 白黒の破線を作るために2つの矩形を重ねる -->
    <rect
      width={right - left + padding}
      height={bottom - top + padding}
      x={left - half_pad}
      y={top - half_pad}
      stroke="white"
    />
    <rect
      width={right - left + padding}
      height={bottom - top + padding}
      x={left - half_pad}
      y={top - half_pad}
      stroke="black"
      stroke-dasharray="4,4"
      on:pointerdown={pointerdownHandler}
      on:pointermove={pointermoveHandler}
      on:pointerup={pointerupHandler}
    />
    <AnchorPointSVG
      x={left - half_pad}
      y={top - half_pad}
      on:move={lefttopHandler}
      --cursor={resizable ? "nwse-resize" : "move"}
    />
    <AnchorPointSVG
      x={right + half_pad}
      y={top - half_pad}
      on:move={righttopHandler}
      --cursor={resizable ? "nesw-resize" : "move"}
    />
    <AnchorPointSVG
      x={left - half_pad}
      y={bottom + half_pad}
      on:move={leftbottomHandler}
      --cursor={resizable ? "nesw-resize" : "move"}
    />
    <AnchorPointSVG
      x={right + half_pad}
      y={bottom + half_pad}
      on:move={rightbottomHandler}
      --cursor={resizable ? "nwse-resize" : "move"}
    />
  </g>
{/if}

<style>
  rect {
    cursor: move;
    fill: none;
    fill-opacity: 0;
  }
</style>
