<script lang="ts">
  import EventList from "./lib/EventList.svelte";
  import RoomMap from "./lib/RoomMap.svelte";
</script>

<main>
    <RoomMap />
    <EventList />
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
