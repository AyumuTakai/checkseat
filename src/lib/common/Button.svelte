<script lang="ts">
  import { createEventDispatcher } from "svelte";

  const dispatcher = createEventDispatcher();
</script>

<button
  on:click={(ev) => {
    dispatcher("click", ev);
  }}
>
  <slot />
</button>

<style>
  button {
    border-radius: var(--border-radius, 0.4rem);
    padding: 0.2em 0.4em;
    background-color: var(--button-primary-bgc);
    color: var(--button-primary-c);
    border: none;
    position: var(--position, initial);
    top: var(--top, auto);
    left: var(--left, auto);
    right: var(--right, auto);
    bottom: var(--bottom, auto);
  }
</style>
