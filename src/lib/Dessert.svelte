<script lang="ts">
  import ButtonIcon from "./ButtonIcon.svelte";
  import CartLogo from "../assets/icon-add-to-cart.svg";
  import DecrementIcon from "../assets/icon-decrement-quantity.svg";
  import IncrementIcon from "../assets/icon-increment-quantity.svg";
  import { shoppingList } from "../state";

  interface Dessert {
    name: string;
    category: string;
    price: number;
    image: {
      thumbnail: string;
      mobile: string;
      tablet: string;
      desktop: string;
    };
  }

  const context: {
    dessert: Dessert;
  } = $props();

  const item = shoppingList.createShoppingItem({
    name: context.dessert.name,
    price: context.dessert.price,
    category: context.dessert.category,
    quantity: 1,
  });
</script>

<article class="grid gap-8">
  <div class="relative w-fit">
    <picture>
      <source
        srcset={context.dessert.image.mobile}
        media="(max-width: 640px)"
      />
      <source
        srcset={context.dessert.image.tablet}
        media="(max-width: 768px)"
      />
      <source
        srcset={context.dessert.image.desktop}
        media="(min-width: 769px)"
      />
      <img
        class="rounded-lg border-2 {item.included.value
          ? 'border-red'
          : 'border-transparent'}"
        src={context.dessert.image.tablet}
        alt={context.dessert.name}
      />
    </picture>
    <div
      class="absolute right-1/2 bottom-0 transform translate-x-1/2 translate-y-1/2 min-w-max h-10 px-8"
    >
      {#if item.included.value}
        <div
          class="w-40 h-10 px-4 flex items-center justify-between bg-red rounded-full text-white"
        >
        <ButtonIcon 
          class="border-white" 
          icon={IncrementIcon}
          alt="increment-item-quantity"
          onclick={item.increment}
        />
        {item.quantity.value}
        <ButtonIcon 
          class="border-white" 
          icon={DecrementIcon}
          alt="decrement-item-quantity"
          onclick={item.decrement}
        />
        </div>
      {:else}
        <button
          class="w-40 h-10 px-4 flex items-center justify-center bg-rose-50 gap-2 rounded-full border border-rose-900 font-semibold text-rose-900 no-wrap"
          onclick={item.add}
        >
          <img src={CartLogo} alt="" />
          Add to Cart
        </button>
      {/if}
    </div>
  </div>
  <div>
    <p class="text-rose-400">{context.dessert.category}</p>
    <h2 class="font-semibold text-xl text-rose-900">{context.dessert.name}</h2>
    <p class="text-red font-bold">${context.dessert.price.toFixed(2)}</p>
  </div>
</article>
