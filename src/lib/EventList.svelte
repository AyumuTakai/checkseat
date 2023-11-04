<script lang="ts">
  import { actionLog } from "../actionStore";
  import Button from "./Button.svelte";
  import FormattedDate from "./common/FormattedDate.svelte";

  export function clearLog() {
    actionLog.set([]);
    localStorage.removeItem("log");
  }
</script>

<section>
  <Button on:click={clearLog}>Clear LOG</Button>
  <hr />
  {#if $actionLog}
    <ul>
      {#each $actionLog as event}
        {#if event}
          <li>
            <FormattedDate
              date={event.datetime}
              format={"yyyy/MM/dd hh:mm:ss"}
            />
            R:{event.room}
            [{("0" + event.no).slice(-2)}] {event.action}
          </li>
        {/if}
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
    height: 100%;
    min-height: 50vh;
    background-color: white;
  }
  ul {
    margin: 0;
    padding: 0;
  }
  li {
    color: black;
    list-style: none;
    font-family: monospace;
  }
  hr {
    margin: 0.5rem 0;
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
