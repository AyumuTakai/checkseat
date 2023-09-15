<script lang="ts">
  import EventList from "./lib/EventList.svelte";
  import RoomMap from "./lib/RoomMap.svelte";
</script>

<main style="height:100vh">
  <div style="height:50vh">
    <RoomMap />
  </div>
  <div style="height:50vh">
    <EventList />
  </div>
</main>

<style>
</style>
