<script lang="ts">
  import { notifications } from "$lib/notification";
  import { fade, fly } from "svelte/transition";
</script>

{#if $notifications}
  <div class="notifications">
    {#each $notifications as notification}
      <div
        in:fly={{ y: -100, duration: 1000 }}
        out:fade
        role="alert"
        class="notification bg-[#0093ED] w-fit py-2 px-4 rounded-md m-auto absolute right-0 left-0 top-20 text-white font-semibold"
      >
        {notification}
      </div>
    {/each}
  </div>
{/if}
