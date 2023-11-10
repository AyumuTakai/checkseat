<script lang="ts">
  import { currentRoom, type Room } from "../../roomStore";
  import SeatRowItem from "./SeatRowItem.svelte";

  const onSeatUpdateHandler = (ev: CustomEvent) => {
    currentRoom.update((room: Room) => {
      const seat = room.seats.find((s) => s == ev.detail.seat);
      seat.no = ev.detail.seat.no;
      seat.cx = ev.detail.seat.cx;
      seat.cy = ev.detail.seat.cy;
      return room;
    });
  };
</script>

<section>
  <table>
    <caption>Seats</caption>
    <tr>
      <th>no</th>
      <th>x</th>
      <th>y</th>
      <th />
    </tr>
    {#each $currentRoom.seats as seat}
      <SeatRowItem {seat} on:update={onSeatUpdateHandler} />
    {/each}
  </table>
</section>

<style>
  section {
    display: flex;
    justify-content: center;
    padding: 1em;
  }
  table {
    border: solid 1px black;
    width: 100%;
    height: 100%;
    border-spacing: 0;
    margin: 0;
    max-width: 60em;
  }
  th {
    border: solid 1px gray;
    padding: 0;
    margin: 0;
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
