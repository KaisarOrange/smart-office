<script>
  import { DateInput } from "date-picker-svelte";
  let date = new Date();
  let hehe = new Date(new Date().setDate(date.getDate() + 1));
  let dat = [hehe, date];
</script>

<DateInput bind:value={date} visible={true} />

<style>
  :root {
    --date-picker-selected-background: yellow;
  }
</style>
