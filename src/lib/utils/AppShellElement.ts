if (typeof window !== 'undefined' && !customElements.get('app-shell')) {
	class AppShellElement extends HTMLElement {
		constructor() {
			super();
			this.attachShadow({ mode: 'open' });
		}

		connectedCallback(): void {
			this.render();
		}

		render(): void {
			// Check for the presence of each slot's content
			const hasHeader: boolean = !!this.querySelector('[slot="header"]');
			const hasSidebarLeft: boolean = !!this.querySelector('[slot="sidebar-left"]');
			const hasSidebarRight: boolean = !!this.querySelector('[slot="sidebar-right"]');
			const hasFooter: boolean = !!this.querySelector('[slot="footer"]');

			// Query the width of each section based on child elements
			const sidebarLeftWidth: string =
				(this.querySelector('[slot="sidebar-left"]') as HTMLElement)?.getAttribute('col') || '4';
			const headerWidth: string =
				(this.querySelector('[slot="header"]') as HTMLElement)?.getAttribute('col') || '12';
			const mainWidth: string =
				(this.querySelector('[slot="main"]') as HTMLElement)?.getAttribute('col') || '12';
			const sidebarRightWidth: string =
				(this.querySelector('[slot="sidebar-right"]') as HTMLElement)?.getAttribute('col') || '4';
			const footerWidth: string =
				(this.querySelector('[slot="footer"]') as HTMLElement)?.getAttribute('col') || '20';

			// Construct grid template for AppShell
			const columns: string = `${sidebarLeftWidth}fr ${mainWidth}fr ${sidebarRightWidth}fr`;

			const sections: NodeListOf<HTMLElement> = this.querySelectorAll('app-section');
			let customStyles: string = ''; // We'll accumulate the custom styles here

			sections.forEach((section, index) => {
				const col: string | null = section.getAttribute('col');
				const gap: string | null = section.getAttribute('gap');

				const gridColumns: string = col ? `repeat(${col}, minmax(0, 1fr))` : '1fr';
				const gridGap: string = gap ? `${gap}px` : '0px'; // Default gap is now 0

				customStyles += `
                    ::slotted(app-section:nth-of-type(${index + 1})) {
                        display: grid;
                        gap: ${gridGap};
                        grid-template-columns: ${gridColumns};
                    }
                `;
			});

			this.shadowRoot!.innerHTML = `
                <style>
                    /* CSS Grid styling */
                    .grid-container {
                        display: grid;
                        grid-template-columns: ${columns};
                        grid-template-areas:
                            "sidebar-left header sidebar-right"
                            "sidebar-left main sidebar-right"
                            "footer footer footer";
                    }
                    
                    /* Ensure each grid item fills its area */
                    ::slotted([slot="header"]) {
                        grid-area: header;
                    }

                    ::slotted([slot="sidebar-left"]) {
                        grid-area: sidebar-left;
                    }

                    ::slotted([slot="main"]) {
                        grid-area: main;
                    }

                    ::slotted([slot="sidebar-right"]) {
                        grid-area: sidebar-right;
                    }

                    ::slotted([slot="footer"]) {
                        grid-area: footer;
                    }
                    ${customStyles}
                </style>

                <div class="grid-container">
                    ${hasHeader ? '<slot name="header"></slot>' : ''}
                    ${hasSidebarLeft ? '<slot name="sidebar-left"></slot>' : ''}
                    <slot name="main"></slot>
                    ${hasSidebarRight ? '<slot name="sidebar-right"></slot>' : ''}
                    ${hasFooter ? '<slot name="footer"></slot>' : ''}
                </div>
            `;
		}
	}
	customElements.define('app-shell', AppShellElement);
}

export {};
