<script lang="ts">
  import { rooms, currentRoom, type Room } from "../../roomStore";
  import SeatListItem from "./SeatListItem.svelte";

  const onSeatUpdateHandler = (ev: CustomEvent) => {
    currentRoom.update((room: Room) => {
      const seat = room.seats.find((f) => f == ev.detail.seat);
      seat.cx = ev.detail.furniture.x;
      seat.cy = ev.detail.seat.y;
      return room;
    });
  };
  const onAddSeatHandler = () => {
    currentRoom.update((room: Room) => {
      room.seats.unshift({
        cx: 10,
        cy: 10,
        no: 0,
      });
      return room;
    });
    rooms.set($rooms);
  };
</script>

<section>
  <table>
    <caption>Furnitures</caption>
    <tr>
      <th>no</th>
      <th>cx</th>
      <th>cy</th>
      <th><button on:click={onAddSeatHandler}>+</button></th>
    </tr>
    {#each $currentRoom.seats as seat, index}
      <SeatListItem
        key={index.toString()}
        {seat}
        on:update={onSeatUpdateHandler}
      />
    {/each}
  </table>
</section>

<style>
  table {
    border: solid 1px black;
    width: 100%;
    height: 100%;
    border-spacing: 0;
    margin: 0;
  }
  th {
    border: solid 1px gray;
    padding: 0;
    margin: 0;
  }
  button {
    width: 1em;
    height: 1em;
    padding: 0;
    background-color: gray;
    color: white;
    border-radius: 0.1em;
    line-height: 1em;
    vertical-align: middle;
  }

  @media (prefers-color-scheme: dark) {
    section,
    table {
      background-color: black;
      color: white;
    }
    table {
      border-color: white;
    }
  }
</style>
