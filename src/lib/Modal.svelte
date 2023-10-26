<script lang="ts">
  export let title: string = "";
  export let show: boolean = false;
  let dialog: HTMLDialogElement;

  $: if (dialog) {
    if (show) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }
</script>

<dialog bind:this={dialog}>
  <header>
    <h2>{title}</h2>
  </header>
  <section>
    <slot />
  </section>
  <footer>
    <button
      on:click={() => {
        dialog.close();
      }}>Exit</button
    >
  </footer>
</dialog>

<style>
  dialog {
    min-width: 400px;
    min-height: 300px;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -200px;
    margin-top: -150px;
    border: solid 1px black;
  }
  dialog header {
    width: 100%;
    background-color: gray;
    text-align: center;
  }
  dialog section {
    display: flex;
    flex-direction: column;
  }
  dialog footer {
    position: absolute;
    width: 100%;
    bottom: 0;
    left: 0;
    padding: 0.2rem 1rem;
  }
  dialog footer button {
    width: 100%;
  }
</style>
