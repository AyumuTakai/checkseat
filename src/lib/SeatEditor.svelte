<script lang="ts">
    import { createEventDispatcher } from "svelte";

    const distpacher = createEventDispatcher();
    export let seat;
</script>

<tr>
    <td
        ><input
            type="number"
            value={seat.no}
            size="4"
            on:input={(ev) => {
                seat.no = parseInt(ev.currentTarget.value);
                distpacher("update", { seat });
            }}
        /></td
    >
    <td
        ><input
            type="number"
            value={seat.cx}
            on:change={(ev) => {
                seat.cx = parseInt(ev.currentTarget.value);
                distpacher("update", { seat });
            }}
            size="4"
        /></td
    >
    <td
        ><input
            type="number"
            value={seat.cy}
            size="4"
            on:change={(ev) => {
                seat.cy = parseInt(ev.currentTarget.value);
                distpacher("update", { seat });
            }}
        /></td
    >
    <td class="buttons">
        <button
            on:click={() => {
                distpacher("duplicate", { seat });
            }}>+</button
        >
        <button
            on:click={() => {
                distpacher("remove", { seat });
            }}>-</button
        >
    </td>
</tr>

<style>
    td {
        border: solid 1px gray;
        padding: 0;
        margin: 0;
    }
    td input {
        margin: 0;
        width: 100%;
        height: 100%;
        border: none;
        text-align: center;
    }
    .buttons {
        display: flex;
        column-gap: 0.2em;
    }
    button {
        width: 1em;
        height: 1em;
        padding: 0;
        background-color: gray;
        color: white;
        border-radius: 0.1em;
        line-height: 1em;
        vertical-align: middle;
    }
</style>
