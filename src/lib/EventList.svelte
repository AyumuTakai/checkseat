<script lang="ts" context="module">
  import { writable } from "svelte/store";

  /**
   * 出席操作記録
   */
  export type Action = {
    room: string;
    datetime: Date;
    no: number;
    action: string;
    msg?: string;
  };

  /**
   * 出席操作ログ
   * 時刻の降順で保存
   */
  export const actionLog = writable<Action[]>(
    // ローカルストレージから復元
    JSON.parse(localStorage.getItem("log") ?? "[]").map((action) => {
      action.datetime = new Date(action.datetime);
      return action;
    })
  );

  /**
   * 出席操作ログ追加
   * @param {Action} action 操作記録
   */
  export function addLog(action: Action) {
    actionLog.update((log: Action[]) => {
      // 時刻の降順で保存
      log.unshift(action);
      localStorage.setItem("log", JSON.stringify(log));
      return log;
    });
  }
</script>

<script lang="ts">
  import Button from "./common/Button.svelte";
  import FormattedDate from "./common/FormattedDate.svelte";

  export function clearLog() {
    actionLog.set([]);
    localStorage.removeItem("log");
  }
</script>

<section>
  <Button on:pointerup={clearLog}>Clear LOG</Button>
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
    min-height: 50svh;
    background-color: white;
  }
  ul {
    margin: 0;
    padding: 0;
    flex-direction: column;
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
