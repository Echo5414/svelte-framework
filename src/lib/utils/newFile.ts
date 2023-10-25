if (typeof window !== 'undefined' && !customElements.get('app-shell')) {
    class AppShellElement extends HTMLElement {
        constructor() {
            super();
            this.attachShadow({ mode: 'open' });
        }

        connectedCallback() {
            this.render();
        }

        render() {
            // Check for the presence of each slot's content
            const hasHeader = !!this.querySelector('[slot="header"]');
            const hasSidebarLeft = !!this.querySelector('[slot="sidebar-left"]');
            const hasSidebarRight = !!this.querySelector('[slot="sidebar-right"]');
            const hasFooter = !!this.querySelector('[slot="footer"]');

            // Adjust the grid template based on available slots
            let columns = '1fr 3fr 1fr';
            let areas = `
                "sidebar-left header header"
                "sidebar-left main sidebar-right"
                "footer footer footer"
            `;

            if (!hasSidebarLeft && !hasSidebarRight) {
                columns = '1fr';
                areas = `
                    "header"
                    "main"
                    "footer"
                `;
            } else if (!hasSidebarLeft) {
                columns = '3fr 1fr';
                areas = `
                    "header header"
                    "main sidebar-right"
                    "footer footer"
                `;
            } else if (!hasSidebarRight) {
                columns = '1fr 3fr';
                areas = `
                    "header header"
                    "sidebar-left main"
                    "footer footer"
                `;
            }

            this.shadowRoot!.innerHTML = `
            <style>
            /* CSS Grid styling */
            .grid-container {
                display: grid;
                grid-template-columns: ${columns};
                grid-template-rows: auto 1fr auto;
                grid-template-areas: ${areas};
            }
                            
            /* Ensure each grid item fills its area */
            ::slotted([slot="header"]) {
                grid-area: header;
                display: flex;
                align-items: center; /* Vertically align */
                justify-content: center; /* Horizontally align */
            }
        
            ::slotted([slot="sidebar-left"]) {
                grid-area: sidebar-left;
                display: flex;
                align-items: start; /* Vertically align */
                justify-content: start; /* Horizontally align */
            }
        
            ::slotted([slot="main"]) {
                grid-area: main;
                display: flex;
                align-items: start; /* Vertically align */
                justify-content: start; /* Horizontally align */
            }
        
            ::slotted([slot="sidebar-right"]) {
                grid-area: sidebar-right;
                display: flex;
                align-items: start; /* Vertically align */
                justify-content: start; /* Horizontally align */
            }
        
            ::slotted([slot="footer"]) {
                grid-area: footer;
                display: flex;
                align-items: center; /* Vertically align */
                justify-content: center; /* Horizontally align */
            }
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
export { };
