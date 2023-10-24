<script lang="ts">
  import { editingObject } from "../roomStore";

  // https://svelte.dev/repl/cf05bd4a4ca14fb8ace8b6cdebbb58da?version=4.2.0

  export let _class: string;
  export let items = [];
  export let activeTabValue = 1;

  const handleClick = (tabValue) => () => {
    activeTabValue = tabValue;
    editingObject.set(undefined);
  };
</script>

<section class={_class}>
  <ul>
    {#each items as item}
      <li class={activeTabValue === item.value ? "active" : ""}>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <span on:click={handleClick(item.value)}>{item.label}</span>
      </li>
    {/each}
  </ul>
  {#each items as item}
    {#if activeTabValue == item.value}
      <div class="box">
        <svelte:component this={item.component} />
      </div>
    {/if}
  {/each}
</section>

<style>
  .box {
    margin-bottom: 10px;
    padding: 1em;
    border: 1px solid #dee2e6;
    border-radius: 0 0 0.5rem 0.5rem;
    border-top: 0;
    background-color: white;
    overflow: scroll;
  }
  ul {
    display: flex;
    flex-wrap: wrap;
    padding-left: 0;
    list-style: none;
    border-bottom: 1px solid #dee2e6;
    margin: 0;
    padding-top: 0.2em;
  }
  li {
    margin-bottom: -1px;
  }

  span {
    border: 1px solid transparent;
    border-top-left-radius: 0.25rem;
    border-top-right-radius: 0.25rem;
    display: block;
    padding: 0.5rem 1rem;
    cursor: pointer;
  }

  span:hover {
    border-color: #e9ecef #e9ecef #dee2e6;
  }

  li.active > span {
    color: #495057;
    background-color: #fff;
    border-color: #dee2e6 #dee2e6 #fff;
  }
  @media (prefers-color-scheme: dark) {
    .box,
    li.active > span {
      background-color: black;
      color: white;
    }
    .box {
      border: 1px solid black;
    }
    ul {
      border-bottom: black;
      background-color: #333;
    }
    li {
      color: #888;
    }
    li.active > span {
      border-color: #555 #555 black;
    }
    span:hover {
      border-color: #555 #555 black;
    }
  }
</style>
