<script lang="ts">
    import { currentRoom } from "../roomStore";
</script>

<section>
    <ul>
        {#each $currentRoom.events as event}
            <li>
                {event.datetime.toLocaleDateString()}
                {event.datetime.toLocaleTimeString()} [{event.no}] {event.action}
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
