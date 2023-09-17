<script lang="ts">
    import Furniture from "./Furniture.svelte";
    import Sheat from "./Sheat.svelte";

    const activeColor = "red";
    const nonActiveColor = "white";

    const furnitures = [
        { x: 70, y: 440, width: 350, height: 60, text: "" },
        { x: 0, y: 354, width: 420, height: 60, text: "" },
        { x: 0, y: 260, width: 420, height: 60, text: "" },
        { x: 70, y: 170, width: 350, height: 60, text: "" },
        { x: 70, y: 80, width: 350, height: 60, text: "" },
        { x: 70, y: 0, width: 350, height: 60, text: "" },

        { x: 450, y: 440, width: 420, height: 60, text: "" },
        { x: 450, y: 354, width: 420, height: 60, text: "" },
        { x: 450, y: 260, width: 420, height: 60, text: "" },
        { x: 450, y: 170, width: 420, height: 60, text: "" },
        { x: 450, y: 80, width: 420, height: 60, text: "" },
        { x: 450, y: 0, width: 420, height: 60, text: "" },

        { x: 900, y: 440, width: 220, height: 60, text: "" },
        { x: 900, y: 354, width: 220, height: 60, text: "" },
        { x: 900, y: 260, width: 220, height: 60, text: "" },
        { x: 900, y: 170, width: 220, height: 60, text: "" },
        { x: 900, y: 80, width: 220, height: 60, text: "" },
        { x: 900, y: 0, width: 220, height: 60, text: "" },

        { x: 480, y: 540, width: 220, height: 60, text: "教卓" },
    ];

    const sheats = [
        { cx: 110, cy: 384, no: 1 },
        { cx: 360, cy: 384, no: 2 },
        { cx: 580, cy: 384, no: 3 },
        { cx: 820, cy: 384, no: 4 },
        { cx: 110, cy: 290, no: 5 },
        { cx: 360, cy: 290, no: 6 },
        { cx: 580, cy: 290, no: 7 },
        { cx: 820, cy: 290, no: 8 },
        { cx: 110, cy: 200, no: 9 },
        { cx: 360, cy: 200, no: 11 },
        { cx: 580, cy: 200, no: 12 },
        { cx: 820, cy: 200, no: 13 },
        { cx: 580, cy: 110, no: 15 },
        { cx: 820, cy: 110, no: 14 },
        { cx: 110, cy: 30, no: 40 },
    ];

    const onClickHndler = (e: Event) => {
        const el = e.target as SVGEllipseElement;
        if (el.style.fill == activeColor) {
            el.style.fill = nonActiveColor;
        } else {
            el.style.fill = activeColor;
        }
    };
</script>

<section>
    <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        version="1.1"
        width="2000px"
        height="1500px"
        viewBox="-0.5 -0.5 1121 601"
    >
        <g>
            {#each furnitures as f}
                <Furniture
                    x={f.x}
                    y={f.y}
                    width={f.width}
                    height={f.height}
                    text={f.text}
                />
            {/each}
            {#each sheats as s}
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
    }
    svg {
        width: 100%;
        height: 100%;
        object-fit: contain;
        background-color: white;
    }
</style>
