<script lang="ts" context="module">
  import { currentRoom, type Room } from "../roomStore";
  import { StorageStore } from "./common/Storage";

  export type Attend = {
    id: number;
    isAttend: boolean;
    attendTime?: Date;
    leaveTime?: Date;
  };

  export const attends = new StorageStore<{ [id: number]: Attend }>("attends", {
    parse: (json: string) => {
      if (json) {
        return JSON.parse(json);
      } else {
        return {};
      }
    },
  });

  export const isAttend = (attends: { [id: number]: Attend }, id: number) => {
    if (attends) {
      return attends[id]["isAttend"];
    }
    return false;
  };

  export function attend(id: number): void {
    attends.update((_attends) => {
      if (!_attends[id]) {
        _attends[id] = {
          id,
          isAttend: true,
        };
      } else {
        _attends[id]["isAttend"] = true;
      }
      _attends[id]["attendTime"] = new Date();
      // console.log("attend", _attends[no]);
      return _attends;
    });
  }

  export function leave(id: number): void {
    attends.update((_attends) => {
      if (!_attends[id]) {
        _attends[id] = {
          id,
          isAttend: false,
        };
      } else {
        _attends[id]["isAttend"] = false;
      }
      _attends[id]["leaveTime"] = new Date();
      // console.log("leave", _attends[no]);
      return _attends;
    });
  }

  export function clearAttends(): void {
    currentRoom.update((_currentRoom: Room) => {
      attends.update((_attends) => {
        for (const seat of _currentRoom.seats) {
          _attends[seat.id] = {
            id: seat.id,
            isAttend: false,
          };
        }
        return _attends;
      });
      return _currentRoom;
    });
  }
</script>

<script lang="ts">
  import { onMount } from "svelte";
  import type { Action } from "./EventList.svelte";
  import FormattedDate from "./common/FormattedDate.svelte";
  import ScrollableTable from "./common/ScrollableTable.svelte";

  const marks = ["x", "/", "○"];

  let today: Date;

  currentRoom.subscribe((_currentRoom) => {
    if (_currentRoom) {
      if (!$attends) {
        $attends = {};
      }
      for (const seat of _currentRoom.seats) {
        const id = seat.id;
        if (!$attends[id]) {
          $attends[id] = {
            id: seat.id,
            isAttend: false,
          };
        }
      }
    }
  });

  const inTime = (no: number, begin: number, end: number, events: Action[]) => {
    // eventのリストを線分に分ける
    const lines = [];
    let line;
    for (const ev of events) {
      if (ev.action == "active") {
        line = {
          begin: ev.datetime.getHours() * 100 + ev.datetime.getMinutes(),
          end: 2400,
        };
        lines.push(line);
      } else if (ev.action == "not active" && line) {
        line.end = ev.datetime.getHours() * 100 + ev.datetime.getMinutes();
      }
    }
    console.log({ no, begin, end, lines });
    return;
  };

  const checkAttend = (no: number, begin: number, end: number) => {
    today = new Date();
    // const events = $currentRoom.events.filter((ev) => {
    //     return ev.no == no && ev.datetime.getDay() == today.getDay();
    // });
    // inTime(no,begin,end,events);

    return 1;
  };

  const mark = (idx: number) => {
    return marks[idx];
  };

  onMount(() => {});
</script>

{#if $currentRoom}
  <ScrollableTable>
    <svelte:fragment slot="head">
      <tr>
        <th>ID</th>
        <th>ラベル</th>
        <th>出席時刻</th>
        <th>退席時刻</th>
        <!--
    {#each $currentRoom.timetables as time}
      <th>{time.title}</th>
    {/each}
    -->
      </tr>
    </svelte:fragment>
    <svelte:fragment slot="body">
      {#each $currentRoom.seats as seat (seat.id)}
        <tr>
          <td>{seat.id}</td>
          <td>{seat.label}</td>
          <td>
            {#if $attends[seat.id] && $attends[seat.id]["attendTime"]}
              <FormattedDate
                date={$attends[seat.id]["attendTime"]}
                format={"hh:mm:ss"}
              />
            {/if}</td
          >
          <td>
            {#if $attends[seat.id] && $attends[seat.id]["leaveTime"]}
              <FormattedDate
                date={$attends[seat.id]["leaveTime"]}
                format={"hh:mm:ss"}
              />
            {/if}
          </td>
          <!-- {#each $currentRoom.timetables as time}
      <td>{mark(checkAttend(seat.no, time.begin, time.end))}</td>
    {/each} -->
        </tr>
      {/each}
    </svelte:fragment>
  </ScrollableTable>
{:else}
  <p>no data</p>
{/if}

<style>
  th {
    padding: 0;
    margin: 0;
    position: sticky;
    white-space: nowrap;
    top: 0;
    border-top: solid 1px black;
  }
  td,th {
    background-color: white;
    border: solid 1px gray;
    text-align: center;
  }

  @media (prefers-color-scheme: dark) {
    th {
      background-color: black;
      border-top-color: white;
    }
  }
</style>
