<script lang="ts">
  import { actionLog } from "../actionStore";
  import { currentRoom } from "../roomStore";
  import { getFormattedDate } from "./common/utility";

  $: roomLog = $actionLog.filter((action) => action.roomId === $currentRoom.id);
</script>

<section>
  {#if roomLog}
    <ul>
      {#each roomLog as event}
        <li>
          {getFormattedDate(event.datetime, "yyyy/MM/dd hh:mm:ss")} R:{event.roomId}
          [{("0" + event.no).slice(-2)}] {event.action}
        </li>
      {/each}
    </ul>
  {:else}
    <p>No Data</p>
  {/if}
</section>

<style>
  section {
    box-sizing: border-box;
    width: 100%;
    height: calc(50vh - 100px);
    background-color: white;
    overflow-y: scroll;
  }
  ul {
    margin: 0;
    padding: 0;
    background-color: transparent;
  }
  li {
    color: black;
    list-style: none;
    font-family: monospace;
  }
  @media (prefers-color-scheme: dark) {
    section {
      background-color: black;
    }
    li {
      color: white;
    }
  }
</style>
