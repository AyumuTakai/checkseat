<script lang="ts">
  import { createEventDispatcher } from "svelte";
  const distpacher = createEventDispatcher();

  export let show: boolean = false;
  let dialog: HTMLDialogElement;
  $: {
    if (dialog) {
      if (show) {
        dialog.showModal();
      } else {
        dialog.close();
        distpacher("exit");
      }
    }
  }
</script>

<dialog bind:this={dialog}>
  <header>
    <h4>Furniture menu</h4>
  </header>
  <main>
    <button
      on:click={() => {
        distpacher("up");
      }}>Up</button
    >
    <button
      on:click={() => {
        distpacher("down");
      }}>Down</button
    >
    <button
      on:click={() => {
        distpacher("addabove");
      }}>Add above</button
    >
    <button
      on:click={() => {
        distpacher("addbelow");
      }}>Add below</button
    >
    <button
      on:click={() => {
        distpacher("copy");
      }}>Copy</button
    >
    <button
      on:click={() => {
        distpacher("remove");
      }}>Remove</button
    >
  </main>
  <footer>
    <button
      on:click={() => {
        dialog.close();
        distpacher("exit");
      }}>Exit</button
    >
  </footer>
</dialog>

<style>
  dialog {
    position: absolute;
    top: 50vh;
    left: 50vw;
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
</style>
