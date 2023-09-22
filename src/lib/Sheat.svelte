<script lang="ts">
    import { currentRoom, type AttendLine, type Room } from "../roomStore";

    export let no: number = 0;
    export let cx: number = 0;
    export let cy: number = 0;

    let el: SVGEllipseElement;

    let attend: AttendLine | undefined;

    const activeColor = "red";
    const nonActiveColor = "white";

    const writeLog = (msg: string) => {
        currentRoom.update((room: Room) => {
            const now = new Date();
            if( ! attend ) {
                attend = {
                    no,
                    begin: now.getHours() * 100 + now.getMinutes(),
                    end: 2400
                }
                room.attends.push(attend);
            }else{
                attend.end = now.getHours() * 100 + now.getMinutes();
                attend = undefined;
            }
            console.log(no, msg, new Date().toLocaleTimeString());
            room.events.push({
                datetime: new Date(),
                no: no,
                action: msg,
            });
            return room;
        });
    };

    const onClickHandler = (e: Event) => {
        // const el = e.target as SVGEllipseElement;
        if (el.style.fill == activeColor) {
            el.style.fill = nonActiveColor;
            writeLog("non active");
        } else {
            el.style.fill = activeColor;
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
    stroke="rgb(0, 0, 0)"
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
        fill: white;
    }
    text,
    ellipse {
        cursor: pointer;
    }
</style>
