<svelte:options namespace={"svg"} />

<script lang="ts">
  import { currentRoom, type Room } from "../roomStore";
  import { attend, attends, isAttend, leave } from "./AttendList.svelte";
  import { addLog } from "./EventList.svelte";
  import SeatShape from "./SeatShape.svelte";

  export let id: number = 0;
  export let label: string = "";
  export let cx: number = 0;
  export let cy: number = 0;
  //   export let attendance: Attend | undefined;

  let el: SVGEllipseElement;

  const writeLog = (msg: string) => {
    const now = new Date();
    // 操作ログに追加
    addLog({
      room: $currentRoom.name,
      datetime: now,
      id,
      label,
      action: msg,
    });
    // 出席記録を更新
    currentRoom.update((room: Room) => {
      // if (!attend) {
      //     attend = {
      //         no,
      //         begin: now.getHours() * 100 + now.getMinutes(),
      //         end: 2400,
      //     };
      //     room.attends.push(attend);
      // } else {
      //     attend.end = now.getHours() * 100 + now.getMinutes();
      //     attend = undefined;
      // }
      return room;
    });
  };

  $: {
    if (el) {
      el.style.fill =
        $attends[id] && $attends[id]["isAttend"]
          ? "var(--activeColor)"
          : "var(--nonActiveColor)";
    }
  }

  const onClickHandler = (e: Event) => {
    if (isAttend($attends,id)) {
      writeLog("leave");
      leave(id);
    } else {
      writeLog("attend");
      attend(id);
    }
  };
</script>

<SeatShape
  {id}
  {label}
  {cx}
  {cy}
  active={isAttend($attends,id)}
  --active-fill-light={"lightgreen"}
  --active-stroke-light={"black"}
  --active-fill-dark={"orange"}
  --active-stroke-dark={"white"}
  --non-active-fill-light={"white"}
  --non-active-stroke-light={"black"}
  --non-active-fill-dark={"black"}
  --non-active-stroke-dark={"white"}
  on:pointerup={onClickHandler}
/>
