<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import { editingObject } from "../roomStore";

    export let furniture;

    const distpacher = createEventDispatcher();

    const selectHandler = () => {
        editingObject.set(furniture);
    };
</script>

<tr class={$editingObject === furniture ? "selected" : ""}>
    <td
        ><input
            type="number"
            value={furniture.x}
            size="4"
            on:focus={selectHandler}
            on:change={(ev) => {
                furniture.x = parseInt(ev.currentTarget.value);
                distpacher("update", { furniture });
            }}
        /></td
    >
    <td
        ><input
            type="number"
            value={furniture.y}
            size="4"
            on:focus={selectHandler}
            on:change={(ev) => {
                furniture.y = parseInt(ev.currentTarget.value);
                distpacher("update", { furniture });
            }}
        /></td
    >
    <td
        ><input
            type="number"
            value={furniture.width}
            size="4"
            on:focus={selectHandler}
            on:change={(ev) => {
                furniture.width = parseInt(ev.currentTarget.value);
                distpacher("update", { furniture });
            }}
        /></td
    >
    <td
        ><input
            type="number"
            value={furniture.height}
            size="4"
            on:focus={selectHandler}
            on:change={(ev) => {
                furniture.height = parseInt(ev.currentTarget.value);
                distpacher("update", { furniture });
            }}
        /></td
    >
    <td
        ><input
            type="text"
            value={furniture.text}
            on:focus={selectHandler}
            on:input={(ev) => {
                furniture.text = ev.currentTarget.value;
                distpacher("update", { furniture });
            }}
        /></td
    >
    <td class="buttons">
        <button></button>
    </td>
</tr>

<style>
    tr.selected {
        background-color: orange;
    }
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
    @media (prefers-color-scheme: dark) {
        td,
        input,
        button {
            background-color: black;
            color: white;
        }
    }
</style>
