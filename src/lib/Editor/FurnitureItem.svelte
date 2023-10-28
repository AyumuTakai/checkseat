<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { editingObject } from "../../roomStore";
  import IconBar3 from "../Icons/IconBar3.svelte";
  import EditorMenu from "../EditorMenu.svelte";

  export let furniture;

  const distpacher = createEventDispatcher();

  let showDialog: boolean = false;

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
      on:input={(ev) => {
        furniture.x = parseInt(ev.currentTarget.value);
        editingObject.update((f) => {
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
      on:input={(ev) => {
        furniture.y = parseInt(ev.currentTarget.value);
        editingObject.update((f) => {
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
      on:input={(ev) => {
        furniture.width = parseInt(ev.currentTarget.value);
        editingObject.update((f) => {
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
      on:input={(ev) => {
        furniture.height = parseInt(ev.currentTarget.value);
        editingObject.update((f) => {
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
        editingObject.update((f) => {
          return f;
        });
        distpacher("update", { furniture });
      }}
    /></td
  >
  <td class="buttons">
    <button
      on:click={() => {
        showDialog = true;
      }}><IconBar3 size="1rem" /></button
    >
  </td>
</tr>
<EditorMenu
  show={showDialog}
  on:exit={() => {
    showDialog = false;
  }}
  on:remove={() => {
    distpacher("remove", { furniture: furniture });
  }}
/>

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
