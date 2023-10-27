<script>
	import { onMount } from 'svelte';

	function forceLayoutUpdate() {
		const appShell = document.querySelector('app-shell');
		if (appShell) {
			// Triggering reflow
			appShell.offsetHeight;

			// Optionally, if you have a specific method in your component to update layout, call it here
			// appShell.updateLayout(); // Uncomment if such a method exists
		}
	}

	onMount(() => {
		if (import.meta.env.SSR) return;
		Promise.all([
			import('$lib/utils/IconElement'),
			import('$lib/utils/AppShellElement'),
			import('$lib/utils/TooltipElement.js')
		]).then(([_, __, tooltipModule]) => {
			tooltipModule.initializeTooltips();
			forceLayoutUpdate(); // Call the function to force layout update
		});
	});
</script>

<app-shell>
	<app-section slot="sidebar-left" col="4" resize="true">
		<span ui-col-xs="1-5">Sidebar-Left</span>
	</app-section>
	<app-section slot="header" col="12" resize="true"> Header </app-section>
	<app-section slot="main" col="12">
		<slot />
		<h2 ui-col-xs="4-12">Another Test</h2>
	</app-section>
	<app-section slot="sidebar-right" col="4" resize="true">
		<span ui-col-xs="1-3">Sidebar-Right</span>
	</app-section>
	<app-section slot="footer" col="20" resize="true">
		Footer
		<app-icon width="64" fill="var(--secondary-color)">icon-layerzero</app-icon>
		<app-icon width="32" fill="#535353">icon-user</app-icon>
	</app-section>
</app-shell>

<style lang="scss">
	app-shell:defined app-section[slot='header'] {
		background-color: rgb(64, 0, 255);
		min-height: var(--headerMinHeight);
		height: var(--headerHeight);

		&[resize='true']::after {
			content: '';
			display: block;
			height: 10px;
			background-color: rgb(0, 0, 0);
			width: 100%;
			cursor: ns-resize;
			position: absolute;
			bottom: 0;
			left: 0;
			z-index: 10;
		}
	}

	app-shell:defined app-section[slot='footer'] {
		background-color: rgb(53, 203, 86);
		min-height: var(--footerMinHeight);
		height: var(--footerHeight);

		&[resize='true']::after {
			content: '';
			display: block;
			height: 10px;
			background-color: rgb(0, 0, 0);
			width: 100%;
			cursor: ns-resize;
			position: absolute;
			top: 0;
			left: 0;
			z-index: 10;
		}
	}

	app-shell:defined app-section[slot='sidebar-left'] {
		background-color: yellow;
		width: var(--sidebarRightWidth);

		&[resize='true']::after {
			content: '';
			display: block;
			width: 10px;
			background-color: rgb(0, 0, 0);
			height: 100%;
			cursor: ew-resize;
			position: absolute;
			right: 0;
			top: 0;
			z-index: 10;
		}
	}

	app-shell:defined app-section[slot='main'] {
		overflow: auto;
	}

	app-shell:defined app-section[slot='sidebar-right'] {
		background-color: rgb(238, 0, 255);
		width: var(--sidebarRightWidth);
		overflow: auto;

		&[resize='true']::before {
			content: '';
			display: block;
			width: 10px;
			background-color: rgb(0, 0, 0);
			height: 100%;
			cursor: ew-resize;
			position: absolute;
			left: 0;
			top: 0;
			z-index: 10;
		}
	}

	:global(app-icon) {
		visibility: hidden;
	}

	:global(app-shell) {
		position: relative;
	}

	:global(:root) {
		--headerHeight: 120px !important;
		--headerMinHeight: 80px;
		--headerMaxHeight: 320x;

		--sidebarRightWidth: 320px !important;
		--sidebarRightMinWidth: 100px;
		--sidebarRightMaxWidth: 600px;

		--sidebarLeftWidth: 420px !important;
		--sidebarLeftMinWidth: 100px;
		--sidebarLeftMaxWidth: 600px;

		--footerHeight: 120px !important;
		--footerMinHeight: 40px;
		--footerMaxHeight: 400px;

		--grid-template-rows: auto 1fr auto;
		--grid-template-areas: 'sidebar-left header header' 'sidebar-left main sidebar-right'
			'footer footer footer';
		--primary-color: #6db4e4;
		--secondary-color: #12121c;
		/* --grid-template-columns:  */
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

	/*   @media only screen and (max-width: 600px) {
    app-shell:defined app-section[slot='sidebar-right'] {
        // Adjustments for smaller screens
        width: 100%; // Example: full width on small screens
    }
} */

	:global() {
		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		// 1.0
		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

		$ui: 'ui-';

		// Grid
		$grid: 'grid';
		$column: 'col';
		$row: 'row';

		// 1.2.1 Grid-Prefixes
		$grid-columns: 12;
		$grid-columns-all: 14; // 1fr repeat(12) 1fr = 14 | needed for columns creation
		$grid-rows: 1;
		$grid-column-gap: 24px; // <= 16px sm; >= md 64px
		$grid-row-gap: 0;
		$grid-column-min: 0;
		$grid-column-max: 96px;

		// Custom
		@mixin col-custom($device: null) {
			$count: 1;
			@while $count <= ($grid-columns-all + 1) {
				@for $i from 1 through ($grid-columns-all + 1) {
					@if ($i + $count) <= ($grid-columns-all + 1) {
						[#{$ui}#{$column}#{$device}='#{$count}-#{($i+$count)}'] {
							grid-column: $count + /+($i + $count);
						}
					}
				}
				$count: $count + 1;
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
			@include col-custom('-xs');
			//@include col-custom("\\:xs");
		}
	}
</style>
