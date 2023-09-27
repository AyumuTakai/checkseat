<script lang="ts">
    import { onMount } from "svelte";
    import { currentRoom, type Action } from "../roomStore";

    const marks = ["x", "/", "○"];

    let today:Date;

    const inTime = (no:number,begin:number,end:number,events:Action[])=>{
        // eventのリストを線分に分ける
        const lines = [];
        let line;
        for (const ev of events) {
            if(ev.action == "active") {
                line = {begin:ev.datetime.getHours()*100+ev.datetime.getMinutes(),end:2400}
                lines.push(line);
            }else if(ev.action == "not active") {
                line.end = ev.datetime.getHours()*100+ev.datetime.getMinutes();
            }
        }
        console.log({no,begin,end,lines});
        return 
    }

    const checkAttend = (no: number, begin: number, end: number) => {
        today = new Date();
        const events = $currentRoom.events.filter((ev) => {
            return ev.no == no && ev.datetime.getDay() == today.getDay();
        });
        inTime(no,begin,end,events);

        return 1;
    };

    const mark = (idx: number) => {
        return marks[idx];
    };

    onMount(()=>{

    });
</script>

<section>
    {#if $currentRoom}
        <table>
            <tr>
                <th>no</th>
                {#each $currentRoom.timetables as time}
                    <th>{time.title}</th>
                {/each}
            </tr>
            {#each $currentRoom.seats as seat}
                <tr>
                    <th>{seat.no}</th>
                    {#each $currentRoom.timetables as time}
                        <td
                            >{mark(
                                checkAttend(seat.no, time.begin, time.end)
                            )}</td
                        >
                    {/each}
                </tr>
            {/each}
        </table>
    {/if}
</section>

<style>
    section {
        background-color: white;
        overflow: scroll;
        color:black;
    }
    table {
        border: solid 1px black;
        width: 100%;
        height: 100%;
        border-spacing: 0;
        margin: 0;
    }
    th,
    td {
        border: solid 1px gray;
    }
    @media(prefers-color-scheme: dark) {
        th,td {
            background-color: black;
            color: white;
            border-color: white;
        }
    }
</style>
