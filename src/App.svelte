<script lang="ts">
  import ButtonIcon from "./lib/ButtonIcon.svelte";
  import Dessert from "./lib/Dessert.svelte";
  import EmptyIllustration from "./assets/illustration-empty-cart.svg";
  import IconRemove from "./assets/icon-remove-item.svg";
  import desserts from "../data.json";
  import { shoppingList } from "./state";
  import { slide } from "svelte/transition";
  import { flip } from "svelte/animate";
</script>

<div class="max-w-1440px mx-auto px-4 py-8 grid xl:grid-cols-12 gap-12">
  <main class="col-span-8 grid gap-12">
    <h1 class="font-bold text-4xl text-rose-900">Desserts</h1>
    <div class="grid gap-y-12 gap-x-6 sm:grid-cols-2 md:grid-cols-3">
      {#each desserts as dessert}
        <Dessert {dessert} />
      {/each}
    </div>
  </main>
  <section class="col-span-4 sticky top-8 h-fit p-4 grid gap-8 bg-white rounded-lg">
    <h2 class="font-bold text-2xl text-red">
      Your Cart ({shoppingList.count.value})
    </h2>
    <div class="grid gap-4">
      {#each shoppingList.shoppingList.value as item (item.name)}
        <article class="flex items-center justify-between" 
        animate:flip={{ duration:300 }} transition:slide={{ duration: 300 }}>
          <div>
            <h3 class="font-bold">{item.name}</h3>
            <div class="flex gap-2">
              <span class="mr-2 text-sm text-red font-bold">
                {item.quantity}x
              </span>
              <span class="text-rose-400">
                @ ${item.price.toFixed(2)}
              </span>
              <output class="text-rose-500 font-bold">
                ${(item.quantity * item.price).toFixed(2)}
              </output>
            </div>
          </div>
          <ButtonIcon 
            class="border-rose-400"
            icon={IconRemove}
            alt="remove-item"
            onclick={() => shoppingList.remove(item.name)}
          />
        </article>
      {:else}
        <div class="mb-4 grid gap-2 justify-items-center" transition:slide={{ duration: 300 }}>
          <img src={EmptyIllustration} alt="Empty Cart" class="mx-auto" />
          <p class="font-semibold text-rose-500">
            Your added items will appear here.
          </p>
        </div>
      {/each}
    </div>
  </section>
</div>
