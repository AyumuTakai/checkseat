<script lang="ts">
  import { currentRoom } from "../../roomStore";
</script>

<section>
  <p>
    RoomName:<input type="text" list="rooms" value={$currentRoom.name} />
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
