<script lang="ts">
    import type { Room } from "../roomStore";
    import Furniture from "./Furniture.svelte";
    import Sheat from "./Sheat.svelte";

    export let room:Room;

    const activeColor = "red";
    const nonActiveColor = "white";
</script>

<section>
    <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        version="1.1"
        width="1200px"
        height="600px"
        viewBox="0 0 1150 600"
    >
        <g>
            {#each room.furnitures as f}
                <Furniture
                    x={f.x}
                    y={f.y}
                    width={f.width}
                    height={f.height}
                    text={f.text}
                />
            {/each}
            {#each room.sheats as s}
                <Sheat cx={s.cx} cy={s.cy} no={s.no} />
            {/each}
        </g>
    </svg>
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
