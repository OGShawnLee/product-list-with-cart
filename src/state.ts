import { computed, readonly, ref } from "./lib/runan.svelte";

export interface Item {
  name: string;
  category: string;
  price: number;
  quantity: number;
  image: { thumbnail: string }
}

function createShoppingList() {
  const shoppingList = ref<Item[]>([]);
  const total = computed(() => {
    return shoppingList.value.reduce((amount, item) => {
      return amount + item.price * item.quantity;
    }, 0)
  });
  const count = computed(() => shoppingList.value.length);
  return {
    shoppingList: readonly(shoppingList),
    total,
    count,
    createShoppingItem(item: Item) {
      const included = computed(() => {
        return shoppingList.value.some(i => i.name === item.name);
      });
      const quantity = computed(() => {
        const existing = shoppingList.value.find(i => i.name === item.name);
        return existing ? existing.quantity : 0;
      })
      return {
        included,
        quantity,
        add() {
          if (included.value) {
            return;
          }

          shoppingList.value.push(item);
        },
        remove() {
          if (included.value) {
            shoppingList.value = shoppingList.value.filter(i => i.name !== item.name)
          }
        },
        increment() {
          const existing = shoppingList.value.find(i => i.name === item.name);
          
          if (existing) {
            existing.quantity++;
          }
        },
        decrement() {
          if (quantity.value === 1) return;

          const existing = shoppingList.value.find(i => i.name === item.name);

          if (existing) {
            existing.quantity--;
          }
        }
      }
    },
    remove(name: string) {
      shoppingList.value = shoppingList.value.filter(i => i.name !== name)
    },
    reset() {
      shoppingList.value = [];
    }
  }
}

export const shoppingList = createShoppingList();