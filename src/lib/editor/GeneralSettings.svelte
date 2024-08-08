<script lang="ts">
  import { currentRoom, rooms } from "../../roomStore";

  const renameRoom = (ev:Event)=>{
    const elm = ev.target as HTMLInputElement;
    $currentRoom.name = elm.value;
    rooms.set($rooms);
  }

</script>

<section>
  <p>
    RoomName:<input type="text" list="rooms" value={$currentRoom.name} on:input={renameRoom} />
  </p>
</section>

<style>
  section {
    display: flex;
    justify-content: center;
    padding: 1em;
  }

  @media (prefers-color-scheme: dark) {
    section {
      background-color: black;
      color: white;
    }
  }
</style>
