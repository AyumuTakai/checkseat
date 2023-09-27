<script lang="ts">
  import { onMount } from "svelte";
  import AttendList from "./lib/AttendList.svelte";
  import EventList from "./lib/EventList.svelte";
  import RoomMap from "./lib/RoomMap.svelte";
  import Tabs from "./lib/Tabs.svelte";
  import { currentRoom, rooms } from "./roomStore";
    import RoomEditor from "./lib/RoomEditor.svelte";

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
    }
  ];

  onMount(() => {
    currentRoom.set($rooms[0]);
  });
</script>

<main>
  <RoomMap />
  <Tabs {items} />
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
    height: 100vh;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
  }
</style>
