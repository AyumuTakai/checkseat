<script lang="ts">
  import { rooms, currentRoom, createNewRoom } from "../roomStore";
  import Modal from "./Modal.svelte";

  let showModal: boolean = false;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<header>
  <h1>
    <button
      on:click={() => {
        showModal = true;
      }}
    >
      {#if $currentRoom}
        {$currentRoom.name}
      {:else}
        Check Seat
      {/if}
    </button>
  </h1>
  {#if $currentRoom}
    <button>Edit</button>
  {/if}
</header>
<Modal title="rooms" show={showModal}>
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
          showModal = false;
        }}>{room.name}</button
      >
    {/each}
  {/if}
</Modal>

<style>
  header {
    display: flex;
  }
  h1 {
    display: block;
    width: 100%;
    text-align: center;
    background-color: navy;
    color: white;
    font-size: 1.4rem;
    height: 2rem;
  }
  h1 button {
    height: 2rem;
    background-color: lightblue;
    color: black;
    border: solid navy;
    padding: 0 0.5rem;
  }
</style>
