<script lang="ts">
  import type { Ref } from "./runan.svelte";
  import IconOrderConfirmed from "../assets/icon-order-confirmed.svg";
  import { Dialog } from "bits-ui";
  import { fade, scale } from "svelte/transition";
  import { shoppingList } from "../state";

  interface Context {
    open: Ref<boolean>;
  }

  const context: Context = $props();
</script>

<Dialog.Root
  bind:open={context.open.value}
  onOpenChange={() => shoppingList.reset()}
>
  <Dialog.Overlay
    class="fixed inset-0 bg-black/80 background-filter backdrop-blur-sm"
    transition={fade}
  />
  <Dialog.Content
    class="fixed right-0 bottom-0 left-0 bg-white p-8 rounded-lg md:(bottom-1/2 right-1/2 left-initial transform translate-x-1/2 translate-y-1/2 w-lg)"
    transition={scale}
    transitionConfig={{ duration: 300, start: 0.75 }}
  >
    <header class="grid gap-6">
      <img src={IconOrderConfirmed} alt="" />
      <Dialog.Title class="font-bold text-rose-900 text-4xl">
        Order Confirmed
      </Dialog.Title>
    </header>
    <Dialog.Description class="text-rose-500">
      We hope you enjoy your food!
    </Dialog.Description>
    <div class="my-8 p-4 grid gap-4 bg-rose-50 rounded-lg">
      {#each shoppingList.shoppingList.value as item (item.name)}
        <article class="flex items-center gap-2">
          <img
            src={item.image.thumbnail}
            alt={item.name}
            class="size-14 rounded-lg"
          />
          <div>
            <h3 class="text-sm font-bold sm:text-base">{item.name}</h3>
            <div class="flex gap-2">
              <span class="mr-2 text-sm text-red font-bold">
                {item.quantity}x
              </span>
              <span class="text-rose-400">
                @ ${item.price.toFixed(2)}
              </span>
            </div>
          </div>
          <output class="ml-auto text-rose-500 font-bold">
            ${(item.quantity * item.price).toFixed(2)}
          </output>
        </article>
      {/each}
      <div class="mt-2 flex items-center justify-between">
        <span class="font-bold text-rose-500">Order Total</span>
        <output class="font-bold text-2xl">
          ${shoppingList.total.value.toFixed(2)}
        </output>
      </div>
    </div>
    <button
      class="button-red"
      onclick={() => {
        shoppingList.reset();
        context.open.value = false;
      }}
    >
      Start New Order
    </button>
  </Dialog.Content>
</Dialog.Root>
