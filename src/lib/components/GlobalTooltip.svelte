<script>
  import { tooltip } from '$lib/utils/TooltipStore';
</script>

{#if $tooltip.visible}
<div class="tooltip-text" style="top: {$tooltip.y}px; left: {$tooltip.x}px;">
  {$tooltip.content}
</div>
{/if}

<style>
  /* ... (styles from Tooltip.svelte) ... */
</style>
