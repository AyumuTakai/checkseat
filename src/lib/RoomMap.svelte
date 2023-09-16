<script lang="ts">
    import Furniture from "./Furniture.svelte";
    import Sheat from "./Sheat.svelte";

    const activeColor = "red";
    const nonActiveColor = "white";

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
        width="1121px"
        height="601px"
        viewBox="-0.5 -0.5 1121 601"
        style="background-color: rgb(255, 255, 255);"
        ><g>
            <Furniture x={70} y={440} width={350} height={60} />
            <Furniture x={0} y={354} width={420} height={60} />
            <Furniture x={0} y={260} width={420} height={60} />
            <Furniture x={70} y={170} width={350} height={60} />
            <Furniture x={70} y={80} width={350} height={60} />
            <Furniture x={70} y={0} width={350} height={60} />

            <Furniture x={450} y={440} width={420} height={60} />
            <Furniture x={450} y={354} width={420} height={60} />
            <Furniture x={450} y={260} width={420} height={60} />
            <Furniture x={450} y={170} width={420} height={60} />
            <Furniture x={450} y={80} width={420} height={60} />
            <Furniture x={450} y={0} width={420} height={60} />

            <Furniture x={900} y={440} width={220} height={60} />
            <Furniture x={900} y={354} width={220} height={60} />
            <Furniture x={900} y={260} width={220} height={60} />
            <Furniture x={900} y={170} width={220} height={60} />
            <Furniture x={900} y={80} width={220} height={60} />
            <Furniture x={900} y={0} width={220} height={60} />

            <Furniture x={480} y={540} width={220} height={60} text={"教卓"} />
            <Sheat cx={110} cy={384} no={1} />
            <Sheat cx={360} cy={384} no={2} />
            <Sheat cx={580} cy={384} no={3} />
            <Sheat cx={820} cy={384} no={4} />
            <Sheat cx={110} cy={290} no={5} />
            <Sheat cx={360} cy={290} no={6} />
            <Sheat cx={580} cy={290} no={7} />
            <Sheat cx={820} cy={290} no={8} />
            <Sheat cx={110} cy={200} no={9} />
            <Sheat cx={360} cy={200} no={11} />
            <Sheat cx={580} cy={200} no={12} />
            <Sheat cx={820} cy={200} no={13} />
            <Sheat cx={580} cy={120} no={15} />
            <Sheat cx={820} cy={120} no={14} />

            <Sheat cx={110} cy={30} no={40} />
        </g></svg>
</section>

<style>
    :global(body) {
        background-color: gray;
    }
    section {
        width: 100%;
        height: 100%;
        padding: 8px;
        background-color: #ccc;
    }
    svg {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
    svg rect {
        fill: white;
    }
</style>
