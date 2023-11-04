<script lang="ts">
  import { onMount } from "svelte";
  import AttendList, { clearAttends } from "./lib/AttendList.svelte";
  import EventList from "./lib/EventList.svelte";
  import Header from "./lib/Header.svelte";
  import RoomEditor from "./lib/RoomEditor.svelte";
  import RoomMap from "./lib/RoomMap.svelte";
  import Tabs from "./lib/Tabs.svelte";
  import { currentRoom, rooms } from "./roomStore";

  let mode: "Check" | "Editor" = "Check";

  const tabItems = {
    Check: [
      {
        label: "List",
        value: 1,
        component: AttendList,
      },
      {
        label: "Log",
        value: 2,
        component: EventList,
      },
    ],
    Editor: [
      {
        label: "Edit",
        value: 1,
        component: RoomEditor,
      },
    ],
  };

  onMount(() => {
    currentRoom.set($rooms[0]);
  });

  const clearAttendsHandler = () => {
    clearAttends();
  };
</script>

<Header
  {mode}
  on:changeMode={(ev) => {
    mode = ev.detail.mode;
    // console.log({ mode });
  }}
/>
<main>
  {#if mode === "Check"}
    <RoomMap _class="halfheight" />
    <Tabs _class="halfheight" items={tabItems[mode]} />
    <button on:click={clearAttendsHandler}>Clear</button>
  {:else if mode === "Editor"}
    <RoomMap _class="halfheight" />
    <Tabs _class="halfheight" items={tabItems[mode]} />
  {/if}
</main>

<style>
  :global(*),
  :global(*::before),
  :global(*::after) {
    box-sizing: border-box;
  }
  main {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: calc(100vh - 2rem);
    padding: 0;
    margin: 2rem 0 0;
    display: flex;
    flex-direction: column;
  }
  main :global(.halfheight) {
    height: calc(50vh - 1rem);
    width: 100%;
    object-fit: contain;
  }
  button {
    position: absolute;
    top: 0.5rem;
    left: 0.5rem;
    width: 5em;
    height: 2em;
    color: black;
    border-radius: 0.4rem;
  }
</style>
