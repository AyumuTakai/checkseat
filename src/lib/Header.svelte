<script lang="ts">
  import { rooms, currentRoom, createNewRoom } from "../roomStore";
  import IconEdit from "./IconEdit.svelte";
  import Modal from "./Modal.svelte";

  let showModal: boolean = false;
</script>

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
    <button class="edit"><IconEdit stroke="white" /></button>
  {/if}
</header>
<Modal
  title="rooms"
  show={showModal}
  on:close={() => {
    showModal = false;
  }}
>
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
    background-color: navy;
  }
  h1 {
    display: block;
    width: 100%;
    text-align: center;
    color: white;
    font-size: 1.4rem;
    height: 2rem;
  }
  h1 button {
    height: 2rem;
    background-color: whitesmoke;
    color: black;
    border: solid navy;
    padding: 0 0.8rem;
    border-radius: 0.3rem;
  }
  button.edit {
    background-color: unset;
    border: none;
  }
</style>
