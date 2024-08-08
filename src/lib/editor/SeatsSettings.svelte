<script lang="ts">
  import { currentRoom, rooms, type Room } from "../../roomStore";
  import ScrollableTable from "../common/ScrollableTable.svelte";
  import SeatRowItem from "./SeatRowItem.svelte";

  const onSeatUpdateHandler = (ev: CustomEvent) => {
    currentRoom.update((room: Room) => {
      const seat = room.seats.find((s) => s.id == ev.detail.seat.id);
      if (seat) {
        seat.id = ev.detail.seat.id;
        seat.label = ev.detail.seat.label;
        seat.cx = ev.detail.seat.cx;
        seat.cy = ev.detail.seat.cy;
      }
      return room;
    });
    rooms.set($rooms);
  };
  const onCreateSeatHandler = (ev: Event) => {
    currentRoom.update((room) => {
      room.seats.push({
        id: 0,
        cx: 0,
        cy: 0,
        label: ""
      });
      return room;
    });
    rooms.set($rooms);
  };
</script>

<ScrollableTable>

      <tr slot="head">
        <th>id</th>
        <th>label</th>
        <th>x</th>
        <th>y</th>
        <th
        ><button title="新規追加" on:click={onCreateSeatHandler}>+</button
        ></th
      >      </tr>

    <svelte:fragment slot="body">
      {#each $currentRoom.seats as seat}
        <SeatRowItem {seat} on:update={onSeatUpdateHandler} />
      {/each}
    </svelte:fragment>

</ScrollableTable>

<style>
  th {
    border: solid 1px gray;
    padding: 0;
    margin: 0;
    position: sticky;
    background-color: white;
    white-space: nowrap;
    top: 0;
    border-top: solid 1px black;
  }
  button {
    border: none;
    width: 100%;
  }
  @media (prefers-color-scheme: dark) {
    th {
      background-color: black;
      border-top-color: white;
    }
  }
</style>
