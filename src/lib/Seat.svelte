<script lang="ts">
  import { addLog } from "../actionStore";
  import { currentRoom, type Room } from "../roomStore";
  import { attend, attends, leave } from "./AttendList.svelte";

  export let no: number = 0;
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
      no,
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
        $attends[no] && $attends[no]["isAttend"]
          ? "var(--activeColor)"
          : "var(--nonActiveColor)";
    }
  }

  const onClickHandler = (e: Event) => {
    if ($attends[no] && $attends[no]["isAttend"]) {
      writeLog("leave");
      leave(no);
    } else {
      writeLog("attend");
      attend(no);
    }
  };
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<ellipse
  {cx}
  {cy}
  rx="20"
  ry="20"
  pointer-events="all"
  on:click={onClickHandler}
  bind:this={el}
/>
<!-- svelte-ignore a11y-click-events-have-key-events -->
<text
  x={cx}
  y={cy}
  on:click={onClickHandler}
  text-anchor="middle"
  dominant-baseline="central">{no}</text
>

<style>
  ellipse {
    --activeColor: lightgreen;
    --nonActiveColor: white;
    fill: white;
    stroke: black;
  }
  text {
    stroke: gray;
  }
  text,
  ellipse {
    cursor: pointer;
  }
  @media (prefers-color-scheme: dark) {
    ellipse {
      --activeColor: orange;
      --nonActiveColor: black;
      fill: black;
      stroke: white;
    }
    text {
      stroke-width: 3;
      stroke: black;
      fill: white;
      paint-order: stroke;
      font-weight: bold;
      stroke-linejoin: round;
    }
  }
</style>
