<script lang="ts">
  import { currentRoom, type Room } from "../roomStore";
  import { addLog } from "../actionStore";
  import { attends, Attendees } from "../attendStore";

  export let no: number = 0;
  export let cx: number = 0;
  export let cy: number = 0;

  let el: SVGEllipseElement;

  const writeLog = (msg: string) => {
    const now = new Date();
    // 操作ログに追加
    addLog({
      roomId: $currentRoom.id,
      datetime: now,
      no,
      action: msg,
    });
    // 出席記録を更新
    attends.update((att: Attendees) => {
      if (msg == "active") {
        att.get(no).inactive(now);
      } else {
        att.get(no).active(now);
      }
      return att;
    });
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

  const onClickHandler = (e: Event) => {
    // const el = e.target as SVGEllipseElement;
    if (el.style.fill == "var(--activeColor)") {
      el.style.fill = "var(--nonActiveColor)";
      writeLog("non active");
    } else {
      el.style.fill = "var(--activeColor)";
      writeLog("active");
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
