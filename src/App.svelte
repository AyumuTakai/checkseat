<script lang="ts">
  import AttendList from "./lib/AttendList.svelte";
  import EventList from "./lib/EventList.svelte";
  import RoomMap from "./lib/RoomMap.svelte";
  import Tabs from "./lib/common/Tabs.svelte";
  import RoomEditor from "./lib/Editor/RoomEditor.svelte";
  import General from "./lib/Editor/General.svelte";
  import Header from "./lib/Header.svelte";
  import FurnituresEditor from "./lib/Editor/FurnituresEditor.svelte";
  import SeatsList from "./lib/Editor/SeatsList.svelte";

  let mode: "Check" | "Editor" = "Check";

  const checkTabs = [
    {
      label: "List",
      value: 1,
      component: AttendList,
    },
    {
      label: "Log",
      value: 2,
      component: EventList,
    },
  ];
  const editorTabs = [
    {
      label: "General",
      value: 1,
      component: General,
    },
    {
      label: "TimeTable",
      value: 2,
      component: AttendList,
    },
    {
      label: "Furnitures",
      value: 3,
      component: FurnituresEditor,
    },
    {
      label: "Seats",
      value: 4,
      component: SeatsList,
    },
  ];
</script>

<Header
  {mode}
  on:changeMode={(ev) => {
    mode = ev.detail.mode;
  }}
/>
<main>
  {#if mode === "Check"}
    <RoomMap _class="halfheight" />
    <Tabs _class="halfheight" items={checkTabs} />
  {:else if mode === "Editor"}
    <RoomEditor _class="halfheight" />
    <Tabs _class="halfheight" items={editorTabs} />
  {/if}
</main>

<style>
  :global(*),
  :global(*::before),
  :global(*::after) {
    box-sizing: border-box;
  }
  main {
    position: absolute;
    top: 2rem;
    left: 0;
    width: 100vw;
    height: calc(100vh - 2rem);
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
  }
  main :global(.halfheight) {
    height: calc(50vh - 1rem);
    width: 100%;
    object-fit: contain;
  }
</style>
