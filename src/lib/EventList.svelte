<script lang="ts">
    import { currentRoom } from "../roomStore";
</script>

<div>
    <ul>
        {#each $currentRoom.events as event}
            <li>
                {event.datetime.toLocaleDateString()}
                {event.datetime.toLocaleTimeString()} [{event.no}] {event.action}
            </li>
        {/each}
    </ul>
</div>

<style>
    div {
        width: 100%;
        height: 100%;
        background-color: white;
        border: solid 10px #ccc;
    }
    li {
        color:black;
        list-style: none;
    }
</style>
