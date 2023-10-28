<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import IconBar3 from "../Icons/IconBar3.svelte";
  import EditorMenu from "./EditorMenu.svelte";
  export let seat;

  const distpacher = createEventDispatcher();
  let showDialog: boolean = false;
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
      on:input={(ev) => {
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
      on:input={(ev) => {
        seat.cy = parseInt(ev.currentTarget.value);
        distpacher("update", { seat });
      }}
    /></td
  >
  <td class="buttons">
    <button
      on:click={() => {
        showDialog = true;
      }}><IconBar3 /></button
    >
  </td>
</tr>
<EditorMenu
  show={showDialog}
  on:exit={() => {
    showDialog = false;
  }}
/>

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
    border-radius: unset;
  }

  .buttons {
    display: flex;
    column-gap: 0.2em;
  }
  button {
    width: 1em;
    height: 100%;
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
