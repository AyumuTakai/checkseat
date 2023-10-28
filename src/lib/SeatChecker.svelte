<script lang="ts">
  import { Attendee } from "../attendStore";
  import { addLog } from "./EventList.svelte";
  import Seat from "./Seat.svelte";

  export let seat: { cx: number; cy: number; no: number };
  export let attendee: Attendee;

  $: isAttend = attendee ? attendee.isAttend() : false;

  const onClickHandler = (e: Event) => {
    const datetime = new Date();
    if (isAttend) {
      attendee.inactive(datetime);
    } else {
      attendee.active(datetime);
    }
    isAttend = !isAttend;
    addLog({
      roomId: attendee.roomId,
      datetime,
      no: attendee.no,
      action: isAttend ? "active" : "inactive",
    });
  };
</script>

<Seat
  no={seat.no}
  cx={seat.cx}
  cy={seat.cy}
  stroke={"black"}
  fill={isAttend ? "lightgreen" : "white"}
  strokeDark={"white"}
  fillDark={isAttend ? "orange" : "black"}
  on:click={onClickHandler}
/>

<style>
</style>
