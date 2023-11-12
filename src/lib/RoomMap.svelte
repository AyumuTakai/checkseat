<script lang="ts">
  import { currentRoom } from "../roomStore";
  import FurnitureShape from "./FurnitureShape.svelte";
  import SeatCheck from "./SeatCheck.svelte";

  export let _class: string;

  const svgW = 1200;
  const svgH = 600;

  const activeColor = "red";
  const nonActiveColor = "white";
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
          {f}
          <FurnitureShape
            x={f.x}
            y={f.y}
            width={f.width}
            height={f.height}
            text={f.text}
          />
        {/each}
        {#each $currentRoom.seats as s}
          <SeatCheck cx={s.cx} cy={s.cy} no={s.no} />
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
