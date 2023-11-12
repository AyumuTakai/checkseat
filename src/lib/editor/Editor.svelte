<script lang="ts" context="module">
  import { writable } from "svelte/store";
  import type { ScalableObject } from "../common/SelectionHandleSVG.svelte";

  export const editingObject = writable<ScalableObject>();
</script>

<script lang="ts">
  import Tabs from "../../lib/common/Tabs.svelte";
  import FurnituresSettings from "./FurnituresSettings.svelte";
  import GeneralSettings from "./GeneralSettings.svelte";
  import RoomMapEditor from "./RoomMapEditor.svelte";
  import SeatsSettings from "./SeatsSettings.svelte";
  import TimetableSettings from "./TimetableSettings.svelte";

  const tabItems = [
    {
      label: "General",
      value: 1,
      component: GeneralSettings,
    },
    {
      label: "Timetable",
      value: 2,
      component: TimetableSettings,
    },
    {
      label: "Furnitures",
      value: 3,
      component: FurnituresSettings,
    },
    {
      label: "Seats",
      value: 4,
      component: SeatsSettings,
    },
  ];
</script>

<RoomMapEditor _class="halfheight" />
<Tabs _class="halfheight" items={tabItems} />
