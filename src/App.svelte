<script lang="ts">
    import AttendList from "./lib/AttendList.svelte";
  import EventList from "./lib/EventList.svelte";
  import RoomMap from "./lib/RoomMap.svelte";
  import Tabs from "./lib/Tabs.svelte";

  const items = [
    {
      label:"List",
      value:1,
      component: AttendList
    },
    {
      label:"Log",
      value:2,
      component: EventList
    },

  ];
</script>

<main>
    <RoomMap />
    <Tabs {items} />
</main>

<style>
  :global(*) {
    box-sizing: border-box;
  }
  main {
    position: absolute;
    top:0;
    left:0;
    width: 100vw;
    height: 100vh;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
  }
</style>
