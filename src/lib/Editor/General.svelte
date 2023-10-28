<script lang="ts">
  import { rooms, currentRoom, type Room, sampleRoom } from "../../roomStore";
  const onChangeNameHandler = (ev: Event) => {
    rooms.set($rooms);
  };
  const onCreateSampleHandler = () => {
    currentRoom.update((room) => {
      room.furnitures = sampleRoom.furnitures;
      room.seats = sampleRoom.seats;
      return room;
    });
    rooms.set($rooms);
  };
</script>

<section>
  <p>
    RoomName:<input
      type="text"
      list="rooms"
      bind:value={$currentRoom.name}
      on:input={onChangeNameHandler}
    />
  </p>
  <button class="createSample" on:click={onCreateSampleHandler}>Sample</button>
</section>

<style>
  .createSample {
    width: 5em;
    height: 1.5em;
  }
</style>
