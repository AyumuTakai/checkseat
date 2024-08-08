<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { currentRoom } from "../roomStore";
  import IconCheck from "./Icons/IconCheck.svelte";
  import IconEdit from "./Icons/IconEdit.svelte";
  import RoomListDialog from "./RoomListDialog.svelte";

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
<RoomListDialog showModal={showModal} on:close={()=>{showModal=false}} />

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
