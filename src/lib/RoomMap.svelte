<script lang="ts">
    import { currentRoom } from "../roomStore";
    import Furniture from "./Furniture.svelte";
    import Sheat from "./Sheat.svelte";

    const activeColor = "red";
    const nonActiveColor = "white";
</script>

<section>
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
                {#each $currentRoom.sheats as s}
                    <Sheat cx={s.cx} cy={s.cy} no={s.no} />
                {/each}
            </g>
        </svg>
    {:else}
        <p>No Data</p>
    {/if}
</section>

<style>
    :global(body) {
        background-color: #ccc;
    }
    section {
        width: 100%;
        height: 100%;
        padding: 8px;
        background-color: white;
        object-fit: contain;
    }
    svg {
        width: 100%;
        height: 100%;
        background-color: white;
    }
</style>
