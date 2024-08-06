<script lang="ts" context="module">
  // https://ribbit.konomi.app/blog/javascript-date-format/
  export function getFormattedDate(dateOrStr: Date | string | undefined, format: string) {
    
    if (!dateOrStr) return "";

    const date: Date =
      typeof dateOrStr === "string" ? new Date(dateOrStr) : dateOrStr;

    const symbol = {
      M: date.getMonth() + 1,
      d: date.getDate(),
      h: date.getHours(),
      m: date.getMinutes(),
      s: date.getSeconds(),
    };

    const formatted = format.replace(/(M+|d+|h+|m+|s+)/g, (v) =>
      (
        (v.length > 1 ? "0" : "") + symbol[v.slice(-1) as keyof typeof symbol]
      ).slice(-2)
    );

    return formatted.replace(/(y+)/g, (v) =>
      date.getFullYear().toString().slice(-v.length)
    );
  }
</script>

<script lang="ts">
  export let date: Date | undefined;
  export let format: string;
</script>

{getFormattedDate(date, format)}
