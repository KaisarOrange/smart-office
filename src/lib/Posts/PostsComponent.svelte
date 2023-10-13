<script lang="ts">
  let liked: boolean;
</script>

<div class="bg-white p-2 mt-2 rounded-sm">
  <div class=" flex justify-center items-center gap-4">
    <div class="flex flex-col items-center">
      <svg
        class="fill-none stroke-[#0093ED]"
        class:liked
        on:click={() => {
          liked = !liked;
        }}
        on:keydown={() => {}}
        aria-hidden
        width="30px"
        height="30px"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <p class="text-xs">200</p>
    </div>
    <div class="flex flex-col items-center justify-center">
      <img class="w-8 h-8" src="/comment.svg" alt="" />
      <p class="text-xs">200</p>
    </div>
    <div class="flex flex-col items-center justify-between">
      <img class="w-7 h-7" src="/send.svg" alt="" />
      <p class="text-xs mt-1">200</p>
    </div>
  </div>
</div>

<style>
  .liked {
    fill: #0093ed;
  }
</style>
