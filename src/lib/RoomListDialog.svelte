<script lang="ts">
    import { createRoom, currentRoom, rooms } from "../roomStore";
    import Modal from "./common/Modal.svelte";

    export let showModal: boolean = false;

</script>

<Modal title="rooms" show={showModal} on:close>
    <button on:pointerup={createRoom}>Create new room</button>
    {#if $rooms}
        {#each $rooms as room}
            <button
                on:pointerup={() => {
                    currentRoom.set(room);
                    showModal = false;
                }}>{room.name}</button
            >
        {/each}
    {/if}
</Modal>
