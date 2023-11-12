<script lang="ts" context="module">
  export class FurnitureWrapper implements ScalableObject {
    furniture: { x: number; y: number; width: number; height: number };

    constructor(f: { x: number; y: number; width: number; height: number }) {
      this.furniture = f;
    }
    get left() {
      return this.furniture.x;
    }
    get top() {
      return this.furniture.y;
    }
    get right() {
      return this.furniture.x + this.furniture.width;
    }
    get bottom() {
      return this.furniture.y + this.furniture.height;
    }
    get key() {
      return `${this.furniture.x}:${this.furniture.y}:${this.furniture.width}:${this.furniture.height}`;
    }
    update(v: { left: number; top: number; right: number; bottom: number }) {
      const { left, right, top, bottom } = v;
      this.furniture.x = left ? Math.floor(left) : this.furniture.x;
      this.furniture.y = top ? Math.floor(top) : this.furniture.y;
      this.furniture.width = right
        ? Math.floor(right - this.furniture.x)
        : this.furniture.width;
      this.furniture.height = bottom
        ? Math.floor(bottom - this.furniture.y)
        : this.furniture.height;

      currentRoom.update((v) => v);
    }
  }

  export class SeatWrapper implements ScalableObject {
    seat: { cx: number; cy: number; no: number };
    r = 20;
    constructor(seat: { cx: number; cy: number; no: number }) {
      this.seat = seat;
    }
    get left() {
      return this.seat.cx - this.r;
    }
    get top() {
      return this.seat.cy - this.r;
    }
    get right() {
      return this.seat.cx + this.r;
    }
    get bottom() {
      return this.seat.cy + this.r;
    }
    get key() {
      return `${this.seat.cx}:${this.seat.cy}:${this.seat.no}`;
    }
    update(v: { left: number; top: number; right: number; bottom: number }) {
      const { left, right, top, bottom } = v;
      this.seat.cx = left ? Math.floor(left + this.r) : this.seat.cx;
      this.seat.cy = top ? Math.floor(top + this.r) : this.seat.cy;
      currentRoom.update((v) => v);
    }
  }
</script>

<script lang="ts">
  import { currentRoom } from "../../roomStore";
  import FurnitureShape from "../FurnitureShape.svelte";
  import SeatShape from "../SeatShape.svelte";
  import SelectionHandleSvg, {
    type ScalableObject,
  } from "../common/SelectionHandleSVG.svelte";
  import { editingObject } from "./Editor.svelte";

  export let _class: string;

  const svgW = 1200;
  const svgH = 600;
</script>

<section class={_class}>
  {#if $currentRoom}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      version="1.1"
      width={svgW + "px"}
      height={svgH + "px"}
      viewBox="0 0 {svgW} {svgH}"
    >
      <g>
        {#each $currentRoom.furnitures as f}
          {@const obj = new FurnitureWrapper(f)}
          <SelectionHandleSvg
            target={obj}
            active={$editingObject &&
              $editingObject.key === `${f.x}:${f.y}:${f.width}:${f.height}`}
            resizable={true}
            movable={true}
            on:update={(ev) => {
              obj.update(ev.detail);
            }}
          >
            <FurnitureShape
              x={f.x}
              y={f.y}
              width={f.width}
              height={f.height}
              text={f.text}
              on:click={() => {
                editingObject.set(obj);
              }}
            />
          </SelectionHandleSvg>
        {/each}
        {#each $currentRoom.seats as s}
          {@const obj = new SeatWrapper(s)}
          <SelectionHandleSvg
            target={obj}
            active={$editingObject &&
              $editingObject.key === `${s.cx}:${s.cy}:${s.no}`}
            resizable={false}
            movable={true}
            on:update={(ev) => {
              obj.update(ev.detail);
            }}
          >
            <SeatShape
              cx={s.cx}
              cy={s.cy}
              no={s.no}
              on:click={() => {
                editingObject.set(obj);
              }}
            />
          </SelectionHandleSvg>
        {/each}
      </g>
    </svg>
  {:else}
    <p>No Data</p>
  {/if}
</section>

<style>
  section {
    padding: 1rem;
  }
  svg {
    width: 100%;
    height: 100%;
  }
  @media (prefers-color-scheme: dark) {
    :global(body) {
      background-color: black;
    }
    section {
      background-color: black;
    }
  }
</style>
