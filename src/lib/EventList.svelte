<script lang="ts">
    import { events } from "../eventStore";
</script>

<div>
    <ul>
        {#each $events as event}
            <li>{event}</li>
        {/each}
    </ul>
</div>

<style>
    div {
        width: 100%;
        height: 100%;
    }
    li {
        list-style: none;
    }
</style>
