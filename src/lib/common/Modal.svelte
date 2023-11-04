<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import XMark from "../Icons/XMark.svelte";

  export let title: string = "";
  export let show: boolean = false;
  let dialog: HTMLDialogElement;

  const distpacher = createEventDispatcher();

  $: if (dialog) {
    if (show) {
      dialog.showModal();
    } else {
      dialog.close();
      distpacher("close");
    }
  }
</script>

<dialog bind:this={dialog}>
  <header>
    <h2>{title}</h2>
    <button
      on:click={() => {
        dialog.close();
        distpacher("close");
      }}><XMark stroke={"white"} /></button
    >
  </header>
  <section>
    <slot />
  </section>
  <footer>
    <slot name="footer" />
  </footer>
</dialog>

<style>
  dialog {
    --width: 400px;
    --height: 300px;
    min-width: var(--width);
    min-height: var(--height);
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: calc(var(--width) / -2);
    margin-top: calc(var(--height) / -2);
    border: none;
    border-radius: var(--border-radius);
    box-shadow: 0px 5px 15px 0px rgba(0, 0, 0, 0.35);
  }
  header {
    width: 100%;
    background-color: var(--primary-color, gray);
    text-align: center;
  }
  h2 {
    display: block;
    width: 100%;
    color: white;
  }
  header button {
    position: absolute;
    right: 0.25rem;
    top: 0.25rem;
    border: solid 1px white;
    border-radius: var(--border-radius);
    background-color: transparent;
  }
  section {
    display: flex;
    flex-direction: column;
  }
  footer {
    position: absolute;
    width: 100%;
    bottom: 0;
    left: 0;
    padding: 0.2rem 1rem;
  }
</style>
