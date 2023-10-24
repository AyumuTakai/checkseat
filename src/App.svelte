<script lang="ts">
  import { onMount } from "svelte";
  import AttendList from "./lib/AttendList.svelte";
  import EventList from "./lib/EventList.svelte";
  import RoomMap from "./lib/RoomMap.svelte";
  import Tabs from "./lib/Tabs.svelte";
  import { currentRoom, rooms } from "./roomStore";
  import RoomEditor from "./lib/RoomEditor.svelte";
  import Header from "./lib/Header.svelte";

  const items = [
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
    {
      label: "Edit",
      value: 3,
      component: RoomEditor,
    },
  ];

  onMount(() => {
    currentRoom.set($rooms[0]);
  });
</script>

<Header />
<main>
  <RoomMap _class="halfheight" />
  <Tabs _class="halfheight" {items} />
</main>

<style>
  :global(*),
  :global(*::before),
  :global(*::after) {
    box-sizing: border-box;
  }
  main {
    position: absolute;
    top: 2rem;
    left: 0;
    width: 100vw;
    height: calc(100vh - 2rem);
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
  }
  main :global(.halfheight) {
    height: calc(50vh - 1rem);
    width: 100%;
    object-fit: contain;
  }
</style>
