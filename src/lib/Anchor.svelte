<script lang="ts">
    import { editingObject } from "../roomStore";
    import AnchorPoint from "./AnchorPoint.svelte";
    import { createEventDispatcher } from "svelte";

    const dispatcher = createEventDispatcher();

    export let x: number;
    export let y: number;
    export let width: number;
    export let height: number;
    export let active: boolean = false;

    let top = 0;
    let left = 0;
    let right = 0;
    let bottom = 0;
    $: {
        if ($editingObject) {
            top = $editingObject.y;
            left = $editingObject.x;
            right = $editingObject.x + $editingObject.width;
            bottom = $editingObject.y + $editingObject.height;
        }
    }

    let padding: number = 8;

    const lefttopHandler = (ev: CustomEvent) => {
        const { x, y } = ev.detail;
        left = x;
        top = y;
        dispatcher("update", { top, left, right, bottom });
    };
    const righttopHandler = (ev: CustomEvent) => {
        const { x, y } = ev.detail;
        right = x;
        top = y;
        dispatcher("update", { top, left, right, bottom });
    };
    const leftbottomHandler = (ev: CustomEvent) => {
        const { x, y } = ev.detail;
        left = x;
        bottom = y;
        dispatcher("update", { top, left, right, bottom });
    };
    const rightbottomHandler = (ev: CustomEvent) => {
        const { x, y } = ev.detail;
        console.log({ x, y });
        right = x;
        bottom = y;
        dispatcher("update", { top, left, right, bottom });
    };
</script>

<slot />
{#if active}
    <rect
        width={width + padding}
        height={height + padding}
        x={x - padding / 2}
        y={y - padding / 2}
        stroke="white"
        fill="none"
    />
    <rect
        width={width + padding}
        height={height + padding}
        x={x - padding / 2}
        y={y - padding / 2}
        stroke="black"
        fill="none"
        stroke-dasharray="4,4"
    />
    <AnchorPoint x={left} y={top} on:move={lefttopHandler} />
    <AnchorPoint x={right} y={top} on:move={righttopHandler} />
    <AnchorPoint x={left} y={bottom} on:move={leftbottomHandler} />
    <AnchorPoint x={right} y={bottom} on:move={rightbottomHandler} />
{/if}
