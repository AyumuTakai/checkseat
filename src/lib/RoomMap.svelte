<script lang="ts">
  import { currentRoom } from "../roomStore";
  import Furniture from "./Furniture.svelte";
  import Seat from "./Seat.svelte";

  export let _class: string;

  const activeColor = "red";
  const nonActiveColor = "white";
</script>

<section class={_class}>
  {#if $currentRoom}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      version="1.1"
      width="1200px"
      height="600px"
      viewBox="0 0 1150 600"
    >
      <g>
        {#each $currentRoom.furnitures as f}
          {f}
          <Furniture
            x={f.x}
            y={f.y}
            width={f.width}
            height={f.height}
            text={f.text}
          />
        {/each}
        {#each $currentRoom.seats as s}
          <Seat cx={s.cx} cy={s.cy} no={s.no} />
        {/each}
      </g>
    </svg>
  {:else}
    <p>No Data</p>
  {/if}
</section>

<style>
  svg {
    width: 100%;
    height: 100%;
    fill: white;
  }
  @media (prefers-color-scheme: dark) {
    :global(body) {
      background-color: black;
    }
    section {
      background-color: black;
    }
    svg {
      fill: black;
      stroke: white;
    }
  }
</style>
