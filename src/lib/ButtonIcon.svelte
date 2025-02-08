<script lang="ts">
  interface Context {
    class: string;
    icon: string;
    alt: string,
    text?: string;
    image?: string;
    onclick: () => void;
  }

  const context: Context = $props();
</script>

<button
  class="size-6 grid place-content-center border rounded-full {context.class}"
  aria-label={context.alt}
  onclick={context.onclick}
>
  <img class="size-3" src={context.icon} alt={context.alt} />
  {#if context.text}
    <span>{context.text}</span>
  {/if}
</button>
