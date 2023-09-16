<script lang="ts">
    import { events } from "../eventStore";

    export let no: number = 0;
    export let cx: number = 0;
    export let cy: number = 0;

    let el: SVGEllipseElement;

    const activeColor = "red";
    const nonActiveColor = "white";

    const writeLog = (msg: string) => {
        events.update((list: string[]) => {
            console.log(no, msg, new Date().toLocaleTimeString());
            list.push(
                `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}  [ ${no} ]  ${msg}`
            );
            return list;
        });
    };

    const onClickHndler = (e: Event) => {
        // const el = e.target as SVGEllipseElement;
        if (el.style.fill == activeColor) {
            el.style.fill = nonActiveColor;
            writeLog("non active");
        } else {
            el.style.fill = activeColor;
            writeLog("active");
        }
    };
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<ellipse
    {cx}
    {cy}
    rx="20"
    ry="20"
    stroke="rgb(0, 0, 0)"
    pointer-events="all"
    on:click={onClickHndler}
    bind:this={el}
/>
<!-- svelte-ignore a11y-click-events-have-key-events -->
<text x={cx} y={cy} on:click={onClickHndler}
text-anchor="middle"
dominant-baseline = "central"
>{no}</text>

<style>
    ellipse {
        fill: white;
    }
    text,
    ellipse {
        cursor: pointer;
    }
</style>
