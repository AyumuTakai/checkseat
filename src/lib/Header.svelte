<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { currentRoom /*, createNewRoom */, rooms } from "../roomStore";
  import IconCheck from "./Icons/IconCheck.svelte";
  import IconEdit from "./Icons/IconEdit.svelte";
  import Modal from "./common/Modal.svelte";

  export let mode: "Check" | "Editor";

  const distpacher = createEventDispatcher();

  let showModal: boolean = false;
</script>

<header>
  <h1>
    <button
      on:pointerup={() => {
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
    {#if mode === "Check"}
      <button
        class="edit"
        on:pointerup={() => {
          mode = "Editor";
          distpacher("changeMode", { mode });
        }}><IconEdit stroke="white" /></button
      >
    {:else if mode === "Editor"}
      <button
        class="edit"
        on:pointerup={() => {
          mode = "Check";
          distpacher("changeMode", { mode });
        }}><IconCheck stroke="white" /></button
      >
    {/if}
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
    on:pointerup={() => {
      // const room = createNewRoom();
      // currentRoom.set(room);
    }}>Create new room</button
  >
  {#if $rooms}
    {#each $rooms as room}
      <button
        on:pointerup={() => {
          currentRoom.set(room);
          showModal = false;
        }}>{room.name}</button
      >
    {/each}
  {/if}
</Modal>

<style>
  header {
    background-color: var(--primary-color);
    height: 2rem;
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
    height: 1.8rem;
    width: 20em;
    background-color: var(--primary-background);
    color: var(--primary-color);
    border: none;
    padding: 0 0.8rem;
    border-radius: var(--border-radius);
    margin-top: 0.1rem;
  }
  button.edit {
    background-color: unset;
    border: none;
    position: absolute;
    right: 0.2rem;
    top: 0.2rem;
  }
</style>
