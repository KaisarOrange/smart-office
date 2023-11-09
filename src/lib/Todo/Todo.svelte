<script>
  import TodoComponent from "$lib/Todo/TodoComponent.svelte";

  let nums = [0, 1, 2, 3, 4, 4, 4];
</script>

<div class=" px-3 h-[550px] py-2 rounded-sm bg-[#D9D9D9] right-5">
  <div class="flex px-1 justify-between items-center">
    <div>
      <p class="font-bold">Activity</p>
      <p class="font-thin">Sabtu, 14 Agustus</p>
    </div>

    <button
      class="btn bg-[#0093ED] text-white font-semibold rounded-md h-8 px-3"
      >Tugas +</button
    >
  </div>

  <hr class="border-slate-700" />
  <div class="h-[450px] overflow-scroll p-2 overflow-x-hidden">
    {#each nums as num}
      <TodoComponent />
    {/each}
  </div>
</div>

<style>
</style>
