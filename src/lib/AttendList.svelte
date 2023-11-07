<script lang="ts" context="module">
  import { currentRoom } from "../roomStore";
  import { StorageStore } from "./common/Strage";

  export type Attend = {
    no: number;
    isAttend: boolean;
    attendTime?: Date;
    leaveTime?: Date;
  };

  export const attends = new StorageStore<{ [no: number]: Attend }>(
    "attends",
    {}
  );
  currentRoom.subscribe((_currentRoom) => {
    if (_currentRoom) {
      for (const seat of _currentRoom.seats) {
        if (!attends[seat.no]) {
          attends[seat.no] = {
            no: seat.no,
            isAttend: false,
          };
        }
      }
    }
  });

  export function attend(no: number): void {
    attends.update((_attends) => {
      if (!_attends[no]) {
        _attends[no] = {
          no,
          isAttend: true,
        };
      } else {
        _attends[no]["isAttend"] = true;
      }
      _attends[no]["attendTime"] = new Date();
      // console.log("attend", _attends[no]);
      return _attends;
    });
  }

  export function leave(no: number): void {
    attends.update((_attends) => {
      if (!_attends[no]) {
        _attends[no] = {
          no,
          isAttend: false,
        };
      } else {
        _attends[no]["isAttend"] = false;
      }
      _attends[no]["leaveTime"] = new Date();
      // console.log("leave", _attends[no]);
      return _attends;
    });
  }

  export function clearAttends(): void {
    currentRoom.update((_currentRoom) => {
      if (_currentRoom) {
        attends.update((_attends) => {
          for (const seat of _currentRoom.seats) {
            _attends[seat.no] = {
              no: seat.no,
              isAttend: false,
            };
          }
          return _attends;
        });
        return _currentRoom;
      }
    });
  }
</script>

<script lang="ts">
  import { onMount } from "svelte";
  import type { Action } from "./EventList.svelte";
  import FormattedDate from "./common/FormattedDate.svelte";

  const marks = ["x", "/", "○"];

  let today: Date;

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
      } else if (ev.action == "not active") {
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

<section>
  {#if $currentRoom}
    <table>
      <tr>
        <th>no</th>
        <th>出席時刻</th>
        <th>退席時刻</th>
        <!--
        {#each $currentRoom.timetables as time}
          <th>{time.title}</th>
        {/each}
        -->
      </tr>
      {#each $currentRoom.seats as seat (seat.no)}
        <tr>
          <th>{seat.no}</th>
          <td>
            {#if $attends[seat.no] && $attends[seat.no]["attendTime"]}
              <FormattedDate
                date={$attends[seat.no]["attendTime"]}
                format={"hh:mm:ss"}
              />
            {/if}</td
          >
          <td>
            {#if $attends[seat.no] && $attends[seat.no]["leaveTime"]}
              <FormattedDate
                date={$attends[seat.no]["leaveTime"]}
                format={"hh:mm:ss"}
              />
            {/if}
          </td>
          <!-- {#each $currentRoom.timetables as time}
            <td>{mark(checkAttend(seat.no, time.begin, time.end))}</td>
          {/each} -->
        </tr>
      {/each}
    </table>
  {/if}
</section>

<style>
  section {
    background-color: white;
    overflow: scroll;
    color: black;
  }
  table {
    border: solid 1px gray;
    width: 100%;
    height: 100%;
    border-spacing: 0;
    margin: 0;
  }
  th,
  td {
    border: solid 1px #333;
    text-align: center;
    color: #333;
  }
  @media (prefers-color-scheme: dark) {
    th,
    td {
      background-color: black;
      color: white;
      border-color: white;
    }
  }
</style>
