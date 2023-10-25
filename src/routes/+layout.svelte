<script>
	import { onMount } from 'svelte';

	onMount(() => {
		if (import.meta.env.SSR) return;
		import('$lib/utils/IconElement');
		import('$lib/utils/AppShellElement');
		import('$lib/utils/TooltipElement.js').then((module) => {
			module.initializeTooltips(); // Call the initializer after importing
		});
	});
</script>

<app-shell>
	<app-section slot="sidebar-left" col="4" style="border: 1px red solid;">
		Sidebar-Left
	</app-section>
	<app-section slot="header" col="12" style="border: 1px red solid;"> Header </app-section>
	<app-section slot="main" col="12" style="border: 1px red solid;">
		<slot />
    <h2 ui-col-xs="4-12" style="border: 1px red solid;">Another Test</h2>
	</app-section>
	<app-section slot="sidebar-right" col="4" style="border: 1px red solid;">
		<span ui-col-xs="1-3">Sidebar-Right</span>
	</app-section>
	<app-section slot="footer" col="20" style="border: 1px red solid;">
		Footer
		<app-icon width="64" fill="var(--secondary-color)">icon-layerzero</app-icon>
		<app-icon width="32" fill="#535353">icon-user</app-icon>
	</app-section>
</app-shell>

<style lang="scss">


  ::slotted([slot="footer"]) {
      grid-area: footer;
      background-color: red;
      /* Add other styles here */
    }

	:global(app-icon) {
		visibility: hidden;
	}

	:global(:root) {
		--primary-color: #3498db;
		--secondary-color: #12121c;
		//--icon-valid: url("...");
	}

  :global(html, body) { 
    height: 100%;
    width: 100%;
    overflow: hidden;
    margin: 0; 
    padding: 0; 
  }

  /* ---------------------------------- */
  // atribute starts here

  :global() {

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // 1.0
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    $ui: "ui-";

    // Grid
    $grid: "grid";
    $column: "col";
    $row: "row";

    // 1.2.1 Grid-Prefixes
    $grid-columns: 12;
    $grid-columns-all: 14; // 1fr repeat(12) 1fr = 14 | needed for columns creation
    $grid-rows: 1;
    $grid-column-gap: 24px; // <= 16px sm; >= md 64px 
    $grid-row-gap: 0;
    $grid-column-min: 0;
    $grid-column-max: 96px;

    // Custom
    @mixin col-custom($device:null) {
      $count: 1;
      @while $count <= ($grid-columns-all+1) {
        @for $i from 1 through ($grid-columns-all+1) {
          @if ($i+$count) <= ($grid-columns-all+1) {
            [#{$ui}#{$column}#{$device}="#{$count}-#{($i+$count)}"] {
              grid-column: $count + / + ($i+$count);
            }
          }
        }
        $count: $count+1;
      }
    }

    @include col-custom();

    // 1.4.1 Breakpoints 
    $grid-breakpoint-xs: 0px;
    $grid-breakpoint-sm: 480px;
    $grid-breakpoint-md: 768px;
    $grid-breakpoint-lg: 1024px;
    $grid-breakpoint-xl: 1440px;

    // 1.4.2 Media query – Extra small devices 
    @media only screen and (min-width: $grid-breakpoint-xs) {

      // Columns: Manually
      @include col-custom("-xs");
      //@include col-custom("\\:xs");
    }

	}
</style>
