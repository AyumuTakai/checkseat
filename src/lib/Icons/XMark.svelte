<script lang="ts">
  export let stroke: string = "currentColor";
  export let size: string = "24px";
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  viewBox="0 0 24 24"
  stroke-width="1.5"
  {stroke}
  style="--size:{size}"
>
  <path
    stroke-linecap="round"
    stroke-linejoin="round"
    d="M6 18L18 6M6 6l12 12"
  />
</svg>

<style>
  svg {
    width: var(--size);
    height: var(--size);
  }
</style>
