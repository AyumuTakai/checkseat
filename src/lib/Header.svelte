<script lang="ts">
  import { rooms, currentRoom, createNewRoom } from "../roomStore";

  let dialog: HTMLDialogElement;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<header
  on:click={() => {
    dialog.showModal();
  }}
>
  {#if $currentRoom}
    <h1>{$currentRoom.name}</h1>
  {:else}
    <h1>Check Seat</h1>
  {/if}
</header>
<dialog bind:this={dialog}>
  <header>
    <h2>Rooms</h2>
  </header>
  <main>
    <button
      on:click={() => {
        const room = createNewRoom();
        currentRoom.set(room);
      }}>Create new room</button
    >
    {#if $rooms}
      {#each $rooms as room}
        <button
          on:click={() => {
            currentRoom.set(room);
            dialog.close();
          }}>{room.name}</button
        >
      {/each}
    {/if}
  </main>
  <footer>
    <button
      on:click={() => {
        dialog.close();
      }}>Exit</button
    >
  </footer>
</dialog>

<style>
  h1 {
    display: block;
    width: 100%;
    text-align: center;
    background-color: navy;
    color: white;
    font-size: 1.4rem;
    height: 2rem;
  }
  dialog {
    width: 400px;
    height: 300px;
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
  dialog main {
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
