<script context="module" lang="ts">
  import { writable } from "svelte/store";

  /**
   * 出席操作記録
   */
  export type Action = {
    roomId: number;
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
