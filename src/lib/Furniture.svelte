<script lang="ts">
    export let x: number;
    export let y: number;
    export let width: number;
    export let height: number;
    export let text: string = "";
</script>

<g>

<rect
    {x}
    {y}
    {width}
    {height}
    fill="rgb(255, 255, 255)"
    stroke="rgb(0, 0, 0)"
    pointer-events="all"
/>
{#if text}
<text
x={x + width / 2}
y={y + height / 2}
fill="rgb(0, 0, 0)"
font-family="Helvetica"
font-size="12px"
text-anchor="middle"
dominant-baseline = "central"
>{text}</text
>
{/if}
</g>

<style>
</style>
