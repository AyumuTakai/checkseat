<script lang="ts">
  import { currentRoom, type Room } from "../../roomStore";
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

<section>
  <table>
    <caption>Furnitures</caption>
    <tr>
      <th>x</th>
      <th>y</th>
      <th>width</th>
      <th>height</th>
      <th>text</th>
      <th />
    </tr>
    {#each $currentRoom.furnitures as furniture}
      <FurnitureRowItem {furniture} on:update={onFurnitureUpdateHandler} />
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
