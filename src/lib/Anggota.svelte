<script lang="ts">
  let anggotas: Number[] = [0, 1, 2];
</script>

<div class="p-2 bg-[#D9D9D9] rounded-sm w-60 h-fit">
  <p class="text-[#0093ED] font-bold">Anggota</p>
  {#each anggotas as anggota}
    <div class="flex gap-2 p-2 bg-white mx-2 my-3 rounded-md">
      <img
        class="w-8 h-8 object-cover rounded-full"
        src="/alif.png"
        alt="profile_picture"
      />
      <div class="text-sm">
        <p class="font-semibold">Alif Ayodya</p>
        <p class="text-xs">@Software Engineer</p>
      </div>
    </div>
  {/each}
</div>
