<script lang="ts">
  import { rooms, currentRoom, type Room } from "../../roomStore";
  import FurnitureItem from "./FurnitureItem.svelte";

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
  const onAddFurnitureHandler = () => {
    currentRoom.update((room: Room) => {
      room.furnitures.unshift({
        x: 10,
        y: 10,
        width: 30,
        height: 30,
        text: "",
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
      <th>x</th>
      <th>y</th>
      <th>width</th>
      <th>height</th>
      <th>text</th>
      <th><button on:click={onAddFurnitureHandler}>+</button></th>
    </tr>
    {#each $currentRoom.furnitures as furniture}
      <FurnitureItem {furniture} on:update={onFurnitureUpdateHandler} />
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
