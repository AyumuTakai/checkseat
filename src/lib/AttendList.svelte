<script lang="ts">
    const entries = [
        {no:1},
        {no:2},
        {no:3},
        {no:4},
        {no:5},
        {no:6},
        {no:7},
        {no:8},
        {no:9},
        {no:10},
        {no:11},
        {no:12},
        {no:13},
        {no:14},
        {no:15},
        {no:40}
    ]
    const timetabels = [
        {"title":"19:00〜19:45"},
        {"title":"19:45〜20:30"},
        {"title":"20:30〜21:15"}
    ]
</script>

<style>
    section {
        background-color: white;
        overflow: scroll;
    }
    table {
        border: solid 1px black;
        width: 100%;
        height: 100%;
        border-spacing: 0;
        margin: 0;
    }
    th,td {
        border: solid 1px gray;
    }
</style>

<section>
    <table>
        <tr>
            <th>no</th>
            {#each timetabels as time}
                <th>{time.title}</th>
            {/each}
        </tr>
        {#each entries as entry}
        <tr>
            <th>{entry.no}</th>
            {#each timetabels as time}
            <td></td>
            {/each}
        </tr>            
        {/each}
    </table>
</section>