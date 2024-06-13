<script lang="ts">
  import { onMount } from 'svelte';
  import { initializeTooltips } from '$lib/utils/TooltipElement';
/*   import { AppShellElement } from 'svelte-framework';
  import { AppShellElement } from '$lib/utils/AppShellElement.js'; */
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



/* 
import { AppShellElement, IconElement, TooltipElement, DropdownElement, ModalElement } from 'svelte-framework';



onMount(() => {
    if (typeof window !== 'undefined') {
    if (!customElements.get('app-shell')) customElements.define('app-shell', AppShellElement);
    if (!customElements.get('app-icon')) customElements.define('app-icon', IconElement);
    if (!customElements.get('app-tooltip')) customElements.define('app-tooltip', TooltipElement);
    if (!customElements.get('app-dropdown')) customElements.define('app-dropdown', DropdownElement);
    if (!customElements.get('app-modal')) customElements.define('app-modal', ModalElement);
    }
  });

 function forceLayoutUpdate(): void {
    const appShell = document.querySelector('app-shell') as HTMLElement;
    if (appShell) {
      appShell.offsetHeight;
    }
  } */

/*   onMount(async () => {
    if (typeof window !== 'undefined') {
      if (!customElements.get('app-shell')) {
        const { default: AppShellElement } = await import('$lib/utils/AppShellElement');
        customElements.define('app-shell', AppShellElement);
      }

      // Dynamically import other custom elements if necessary
      await Promise.all([
        import('$lib/utils/IconElement'),
        import('$lib/utils/TooltipElement'),
        import('$lib/utils/DropdownElement'),
        import('$lib/utils/ModalElement')
      ]);

      initializeTooltips();
      forceLayoutUpdate();
    }
  });

  function forceLayoutUpdate(): void {
    const appShell = document.querySelector('app-shell') as HTMLElement;
    if (appShell) {
      appShell.offsetHeight;
    }
  } */

/*   import AppShellElement from '$lib/utils/AppShellElement';

  onMount(() => {
    if (typeof window !== 'undefined') {
      if (!customElements.get('app-shell')) {
        customElements.define('app-shell', AppShellElement);
      }
    }
  }); */

/*   onMount(() => {
    if (typeof window !== 'undefined') {
      Promise.all([
        import('$lib/utils/AppShellElement')
      ])
      .then(([AppShellModule]) => {
        const AppShellElement = AppShellModule.default;
        
        if (!customElements.get('app-shell')) {
          customElements.define('app-shell', AppShellElement);
        }
        
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
  } */



/*   onMount(() => {
    if (typeof window !== 'undefined') {
      Promise.all([
        import('$lib/utils/AppShellElement'),
        //import('$lib/utils/IconElement'),
        //import('$lib/utils/TooltipElement'),
        //import('$lib/utils/DropdownElement'),
        //import('$lib/utils/ModalElement')
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
  } */

/*   const t: ToastSettings = {
	  message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit...',
  };
  toastStore.trigger(t); */

</script>


<AppShellElement />
<app-shell theme="default">
	<app-section slot="sidebar-left" col="4" gap="0" resize="true">
		<nav id="home" app-col-xs="1-5">
			<ul>
				<li>
					<a href="" tooltipDescription="Bibliothek ausblenden" tooltipPosition="right">
            <app-icon width="32" fill="white" app-pr-xs="8">icon-home</app-icon>
						<span>Home</span>
					</a>
				</li>
				<li>
					<a href="" app-tooltip-description="Bibliothek ausblenden" tooltipPosition="bottom">
            <app-icon width="32" fill="white" app-pr-xs="8">icon-search</app-icon>
						<span>Search</span>
					</a>
				</li>
			</ul>
		</nav>
    <div class="cardLeft" app-col-xs="1-5" >
      <nav id="library" app-align="between">
        <ul>
          <li>
            <a href="" tooltipDescription="Bibliothek ausblenden" tooltipPosition="top">
              <app-icon width="32" fill="white" app-pr-xs="8">icon-library</app-icon>
              <span>Bibliothek</span>
            </a>
          </li>
        </ul>
        <ul>
          <li>
            <button class="transparent-rounded" tooltipDescription="Go back" tooltipPosition="bottom">
              <app-icon width="16" fill="white" >icon-plus</app-icon>
            </button>
          </li>
          <li>
            <button class="transparent-rounded" tooltipDescription="Go back" tooltipPosition="left">
              <app-icon width="16" fill="white" >icon-showMore</app-icon>
            </button>
          </li>
        </ul>
      </nav>
      <nav id="area">
        <ul>
          <li>
            <button class="pill-rounded">Playlists</button>
          </li>
          <li>
            <button class="pill-rounded">Alben</button>
          </li>
          <li>
            <button class="pill-rounded">Künstler</button>
          </li>
        </ul>
      </nav>

<!--       <details>
        <summary>Dropdown Menu</summary>
        <ul>
          <li><a href="#">Option 1</a></li>
          <li><a href="#">Option 2</a></li>
          <li><a href="#">Option 3</a></li>
        </ul>
      </details>
 --> 
      <app-dropdown>
        <!-- Slot: Action -->
        <button theme="default">
          <span>Recents</span>
          <app-icon width="20" fill="white" app-pl-xs="8">icon-list</app-icon>
        </button>
        <!-- Slot: Content -->
        <nav>
          <ul>
            <li><small>Sortieren nach</small></li>
            <li><a href="">Zuletzt</a></li>
            <li><a href="">Kürzlich hinzugefügt</a></li>
            <li>
              <details>
              <a href="">Alphabetisch</a>
              <ul class="">
                <li>
                  <a href="">Link #1</a>
                  <a href="">Link #2</a>
                  <a href="">Link #3</a>
                </li>
              </ul>
            </details>
            </li>
            <li><a href="">Ersteller</a></li>
          </ul>
          <ul>
            <li><small>Ansicht</small></li>
            <li>
              <a href="">
                <app-icon width="20" fill="white" app-pr-xs="4">icon-compact</app-icon>
                <span>Kompakt</span>
              </a>
            </li>
            <li>
              <a href="">
                <app-icon width="20" fill="white" app-pr-xs="4">icon-list</app-icon>
                <span>Liste</span>
              </a>
            </li>
            <li>
              <a href="">
                <app-icon width="20" fill="white" app-pr-xs="4">icon-grid</app-icon>
                <span>Raster</span>
              </a>
            </li>
          </ul>
        </nav>
      </app-dropdown>
      
      <app-card>
        
      </app-card>
    </div>

	</app-section>
  <app-section slot="sidebar-left" col="2" gap="0" resize="true">
    <div app-col-xs="1-3">
      <p>Sidebar 2</p>
    </div>
  </app-section>
	<app-section slot="header" col="12" resize="true">
    Header 

    <button data-modal-target="myModal">Toggle Modal</button>

    <app-modal id="myModal" theme="default">
      <header>
        <h1>Confirm Your Membership</h1>
      </header>
      <section app-py-xs="16">  
          <p>Thank you for signing up for a membership! Please review the membership details below:<br>
          <ul>
              <li>Membership: Individual</li>
              <li>Price: $10</li>
          </ul>
      </section>
      <footer app-align="right">
          <button app-mr:md="8">Cancel</button>
          <button>Confirm</button>    
      </footer>
    </app-modal>
    <h1>hello</h1>
  
    </app-section>
	<app-section slot="main" col="12">
		<slot />
	</app-section>
	<app-section slot="sidebar-right" col="4" resize="true">
		<span app-col-xs="1-3">Sidebar-Right</span>
	</app-section>
	<app-section slot="footer" col="20" resize="true">
		Footer
		<app-icon width="64" fill="var(--secondary-color)">icon-layerzero</app-icon>
		<app-icon width="32" fill="#535353">icon-user</app-icon>
	</app-section>
</app-shell>

<style lang="scss">

	.menu-item {
		display: flex;
		align-items: center;
	}

	/* Optional: Weitere Anpassungen am Text-Styling */
	.menu-item span {
		/* Hier könnten Sie weitere Stil-Anpassungen vornehmen */
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

    .cardLeft {
      //border: 1px red solid;
			background-color: rgb(54, 56, 61);
			border-radius: 8px;
			margin: 4px 8px 4px 8px;
      padding: 16px;
    }

		#home {
			//border: 1px red solid;
			background-color: rgb(54, 56, 61);
			border-radius: 8px;
			margin: 8px 8px 4px 8px;
      padding: 16px;

			ul > li {
				list-style: none;
				line-height: 32px;
			}
		}

		#library {

			ul > li {
				list-style: none;
				line-height: 32px;
        float: left;
			}
		}

    #area {
      //border: 1px red solid;
      display:flex;
      margin: 16px 0;
      ul {
        li {
          float:left;
          margin: 0 4px 0 0;
          :last-child {
            margin: 0;
          }
        }
      }
    }

    #search {

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


/* 	:global(html, body) {
		height: 100%;
		width: 100%;
		overflow: hidden;
		margin: 0;
		padding: 0;
	} */

	:global(body) {
		background-color: var(--bodyBackgroundColor);
		color: var(--bodyColor);
		font-family: 'Circular', 'Segoe UI', Arial, Tahoma, Geneva, Verdana, sans-serif;
	}

  :global(.tooltip-content) {
    background-color: var(--tooltip-bg-color);
    color: var(--tooltip-text-color);
    border-radius: 4px;
    font-size: small;
  }

	:global() {
    .tooltip-content {} // DOES NOT WORK!!!!
	}
</style>