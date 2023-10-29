<script lang="ts">
  import { onMount } from 'svelte';
  import { initializeTooltips } from '$lib/utils/TooltipElement';

  onMount(() => {
    if (typeof window !== 'undefined') {
      Promise.all([
        import('$lib/utils/IconElement'),
        import('$lib/utils/AppShellElement'),
        import('$lib/utils/TooltipElement')
      ])
      .then(() => {
        initializeTooltips();
        forceLayoutUpdate();
      })
      .catch((error: Error) => {
        console.error('Error loading modules:', error);
      });
    }
  });

  function forceLayoutUpdate(): void {
    const appShell = document.querySelector('app-shell') as HTMLElement;
    if (appShell) {
      appShell.offsetHeight;
    }
  }
</script>

<app-shell>
	<app-section slot="sidebar-left" col="4" gap="0" resize="true">
		<nav id="home" ui-col-xs="1-5">
			<ul>
				<li>
					<a href=""
						><app-icon width="20" fill="white" ui-pr-xs="8">icon-home</app-icon>
						<span>Home</span>
					</a>
				</li>
				<li>
					<a href=""
						><app-icon width="20" fill="white" ui-pr-xs="8">icon-search</app-icon>
						<span>Search</span>
					</a>
				</li>
			</ul>
		</nav>
		<nav id="library" ui-col-xs="1-5">
			<ul>
				<li>
					<a href="" tooltipDescription="Bibliothek ausblenden" tooltipPosition="top">
						<app-icon width="20" fill="white" ui-pr-xs="8">icon-library</app-icon>
						<span>Bibliothek</span>
					</a>
				</li>
			</ul>
		</nav>
	</app-section>
	<app-section slot="header" col="12" resize="true"> Header </app-section>
	<app-section slot="main" col="12">
		<slot />
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

      --grid-template-rows: auto;
      --grid-template-areas: 
        'sidebar-left header sidebar-right' 
        'sidebar-left main sidebar-right'
        'footer footer sidebar-right';
      --primary-color: #6db4e4;
      --secondary-color: #12121c;

      --bodyBackgroundColor: rgba(0, 0, 0, 1);
      --bodyColor: rgba(200, 200, 200, 1);

      --tooltip-bg-color: #4e4d50;
      --tooltip-text-color: white;
      /* --grid-template-columns:  */
      //--icon-valid: url("...");
    }


	.menu-item {
		display: flex;
		align-items: center; /* Zentriert die Inhalte vertikal */
	}

	app-icon,
	span {
		vertical-align: middle;
		display: inline-block;
	}

	app-icon svg {
		width: auto;
		height: auto;
		max-width: 100%;
		max-height: 100%;
		display: block;
	}

	/* Optional: Weitere Anpassungen am Text-Styling */
	.menu-item span {
		/* Hier könnten Sie weitere Stil-Anpassungen vornehmen */
	}

	app-shell:defined app-section[slot='header'] {
		background-color: rgb(64, 0, 255);
		min-height: var(--headerMinHeight);
		height: var(--headerHeight);
    border-radius: 8px;

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

  app-shell:defined app-section[slot='main'] {
    background-color: rgb(54, 56, 61);
    border-radius: 8px;
		overflow: auto;
	}

	app-shell:defined app-section[slot='sidebar-left'] {
		background-color: black;
		width: var(--sidebarRightWidth);
    display: grid;
    grid-template-rows: min-content;
    align-items: start;

		&[resize='true']::after {
			content: '';
			display: block;
			width: 4px;
			height: 100%;
			cursor: ew-resize;
			position: absolute;
			right: 0;
			top: 0;
			z-index: 10;
		}

		#home {
			//border: 1px red solid;
			background-color: rgb(54, 56, 61);
			border-radius: 8px;
			margin: 8px 8px 4px 8px;

			ul > li {
				list-style: none;
				line-height: 32px;
			}
		}

		#library {
			//border: 1px red solid;
			background-color: rgb(54, 56, 61);
			border-radius: 8px;
			margin: 4px 8px 4px 8px;

			ul > li {
				list-style: none;
				line-height: 32px;
			}
		}
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

	:global(app-icon) {
		visibility: hidden;
	}

	:global(app-shell) {
		position: relative;
	}



	:global(html, body) {
		height: 100%;
		width: 100%;
		overflow: hidden;
		margin: 0;
		padding: 0;
	}

	:global(body) {
		background-color: var(--bodyBackgroundColor);
		color: var(--bodyColor);
		font-family: 'Segoe UI', Arial, Tahoma, Geneva, Verdana, sans-serif;
	}

  :global(.tooltip-content) {
    background-color: var(--tooltip-bg-color);
    color: var(--tooltip-text-color);
    border-radius: 4px;
    font-size: small;
  }




	:global() {

    .tooltip-content {} // DOES NOT WORK!!!!
    

		a,
		a:visited {
			color: inherit;
			text-decoration: none;

			&:hover {
				text-decoration: underline;
				color: white;
			}
		}

    ::-webkit-scrollbar {
      width: 8px;
      background-color: transparent;
      cursor: pointer; // funktioniert nicht, bitte überprüfen

      &:hover {
      }

      &-thumb {
        background-color: rgba(200,200,200,1);

        &:hover {
          background-color: rgba(225,225,225,1);
        }
      }

      &-track {
        
      }
    }

    
	}
</style>
