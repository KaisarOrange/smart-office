<script>
  import Notification from "./Notification.svelte";
  import { Avatar } from "@skeletonlabs/skeleton";
  import { goto } from "$app/navigation";
</script>

<div class="flex justify-center items-center gap-3 select-none cursor-pointer">
  <Avatar src={"/alif.png"} width={"w-12"} />
  <div class="font-semibold">Hi, Alif!</div>
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div
    style="background-image: url(/message.svg);"
    class="relative block w-6 h-6 bg-contain"
    on:click={() => goto("/message")}
  >
    <span
      class="absolute text-xs text-white font-bold bottom-3 left-3 bg-[#0093ED] rounded-full px-1"
      >2</span
    >
  </div>

  <Notification />
</div>
