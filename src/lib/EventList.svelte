<script lang="ts">
    import { actionLog } from "../actionStore";

    // https://ribbit.konomi.app/blog/javascript-date-format/
    const getFormattedDate = (date: Date, format: string) => {
        const symbol = {
            M: date.getMonth() + 1,
            d: date.getDate(),
            h: date.getHours(),
            m: date.getMinutes(),
            s: date.getSeconds(),
        };

        const formatted = format.replace(/(M+|d+|h+|m+|s+)/g, (v) =>
            (
                (v.length > 1 ? "0" : "") +
                symbol[v.slice(-1) as keyof typeof symbol]
            ).slice(-2)
        );

        return formatted.replace(/(y+)/g, (v) =>
            date.getFullYear().toString().slice(-v.length)
        );
    };
</script>

<section>
    <ul>
        {#each $actionLog as event}
            <li>
                {getFormattedDate(event.datetime, "yyyy/MM/dd hh:mm:ss")} R:{event.room}
                [{("0" + event.no).slice(-2)}] {event.action}
            </li>
        {/each}
    </ul>
</section>

<style>
    section {
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        min-height: 50vh;
        background-color: white;
    }
    ul {
        margin: 0;
        padding: 0;
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
