<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import { editingObject } from "../roomStore";

    export let furniture;

    const distpacher = createEventDispatcher();
    let dialog:HTMLDialogElement;

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
                editingObject.update((f)=>{
                    return f;
                });
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
                editingObject.update((f)=>{
                    return f;
                });
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
                editingObject.update((f)=>{
                    return f;
                });
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
                editingObject.update((f)=>{
                    return f;
                });
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
                editingObject.update((f)=>{
                    return f;
                });
                distpacher("update", { furniture });
            }}
        /></td
    >
    <td class="buttons">
        <button
            on:click={() => {
                dialog.showModal();
            }}
        />
    </td>
</tr>
    <dialog bind:this={dialog}>
        <header>
            <h4>Furniture menu</h4>
        </header>
        <main>
            <button>Up</button>
            <button>Down</button>
            <button>Add above</button>
            <button>Add below</button>
            <button>Copy</button>
            <button>Remove</button>
        </main>
        <footer>
            <button on:click={()=>{
                dialog.close();
            }}>Close</button>
        </footer>
    </dialog>

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
    dialog {
        position: absolute;
        top:50vh;
        left:50vw;
        width: 400px;
        margin-left: -200px;
        height: 300px;
        margin-top: -150px;
    }
    dialog header {
        background-color: gray;
        color: white;
    }
    dialog header,
    dialog footer {
        text-align: center;
    }
    dialog main {
        display: flex;
        flex-wrap: wrap;
        flex-direction: column;
        justify-content: space-around;
        row-gap: 0.5em;
        padding: 0.5em;
    }
    dialog footer {
        position: absolute;
        width: 100%;
        bottom: 0;
        padding: 0.4em;
    }
    dialog button {
        width: 100%;
        height: 1.8em;
        color: black;
        background-color: #eee;
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
