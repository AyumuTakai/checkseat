<script lang="ts">

</script>

<section>
    <table>
        <thead>
            <slot name="head" />
        </thead>
        <tbody>
            <slot name="body" />
        </tbody>
    </table>
</section>

<style>
    section {
      display: flex;
      justify-content: center;
      overflow: auto;
      height: 100%;
    }
    table {
      border: solid 1px black;
      width: 100%;
      height: 100%;
      border-spacing: 0;
      margin: 0;
      max-width: 60em;
    }
    @media (prefers-color-scheme: dark) {
      section,
      table {
        background-color: black;
        color: white;
      }
      table {
        border-color: white;
      }
    }
  </style>
  