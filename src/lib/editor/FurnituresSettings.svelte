<script lang="ts">
  import { currentRoom, type Room } from "../../roomStore";
  import ScrollableTable from "../common/ScrollableTable.svelte";
  import FurnitureRowItem from "./FurnitureRowItem.svelte";

  const onFurnitureUpdateHandler = (ev: CustomEvent) => {
    currentRoom.update((room: Room) => {
      const furniture = room.furnitures.find((f) => f == ev.detail.furniture);
      furniture.x = ev.detail.furniture.x;
      furniture.y = ev.detail.furniture.y;
      furniture.width = ev.detail.furniture.width;
      furniture.height = ev.detail.furniture.height;
      return room;
    });
  };
</script>

<ScrollableTable>
  <tr slot="head">
    <th>label</th>
    <th>x</th>
    <th>y</th>
    <th>width</th>
    <th>height</th>
  </tr>
  <svelte:fragment slot="body">
    {#each $currentRoom.furnitures as furniture}
      <FurnitureRowItem {furniture} on:update={onFurnitureUpdateHandler} />
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
  @media (prefers-color-scheme: dark) {
    th {
      background-color: black;
      border-top-color: white;
    }
  }
</style>
