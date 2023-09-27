<script lang="ts">
    import { rooms, currentRoom, type Room } from "../roomStore";
    import FurnitureEditor from "./FurnitureEditor.svelte";
    import SeatEditor from "./SeatEditor.svelte";

    const onFurnitureUpdateHandler = (ev: CustomEvent) => {
        currentRoom.update((room: Room) => {
            const furniture = room.furnitures.find(
                (f) => f == ev.detail.furniture
            );
            furniture.x = ev.detail.furniture.x;
            furniture.y = ev.detail.furniture.y;
            furniture.width = ev.detail.furniture.width;
            furniture.height = ev.detail.furniture.height;
            return room;
        });
    };

    const onSeatUpdateHandler = (ev: CustomEvent) => {
        currentRoom.update((room: Room) => {
            const seat = room.seats.find((s) => s == ev.detail.seat);
            seat.no = ev.detail.seat.no;
            seat.cx = ev.detail.seat.cx;
            seat.cy = ev.detail.seat.cy;
            return room;
        });
    };
</script>

<section>
    <p>
        RoomName:<input type="text" list="rooms" value={$currentRoom.name} />
        <button title="部屋追加">+</button>
        <button title="部屋削除">-</button>
    </p>
    <datalist id="rooms">
        {#each $rooms as room}
            <option value={room.name} />
        {/each}
    </datalist>
    <div class="tables">
        <table>
            <caption>Furnitures</caption>
            <tr>
                <th>x</th>
                <th>y</th>
                <th>width</th>
                <th>height</th>
                <th>text</th>
                <th />
            </tr>
            {#each $currentRoom.furnitures as furniture}
                <FurnitureEditor
                    {furniture}
                    on:update={onFurnitureUpdateHandler}
                />
            {/each}
        </table>
        <table>
            <caption>Seats</caption>
            <tr>
                <th>no</th>
                <th>x</th>
                <th>y</th>
                <th />
            </tr>
            {#each $currentRoom.seats as seat}
                <SeatEditor {seat} on:update={onSeatUpdateHandler} />
            {/each}
        </table>
    </div>
</section>

<style>
    .tables {
        display: flex;
        justify-content: space-around;
        column-gap: 1em;
    }
    table {
        border: solid 1px black;
        width: 100%;
        height: 100%;
        border-spacing: 0;
        margin: 0;
    }
    th {
        border: solid 1px gray;
        padding: 0;
        margin: 0;
    }
    button {
        width: 1em;
        height: 1em;
        padding: 0;
        background-color: gray;
        color: white;
        border-radius: 0.1em;
        line-height: 1em;
        vertical-align: middle;
    }
</style>
