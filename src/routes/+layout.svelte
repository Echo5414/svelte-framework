<script lang="ts">
  import { onMount } from 'svelte';
  import { initializeTooltips } from '$lib/utils/TooltipElement.js';
  import AppShellElement from 'svelte-framework';

  import { AppShellElement } from 'svelte-framework';
  import AppShellElement from 'svelte-framework';

  onMount(() => {
    if (typeof window !== 'undefined') {
      if (!customElements.get('app-shell')) customElements.define('app-shell', AppShellElement);
    }
  });

  function forceLayoutUpdate(): void {
    const appShell = document.querySelector('app-shell') as HTMLElement;
    if (appShell) {
      appShell.offsetHeight;
    }
  }
</script>

<AppShellElement />
