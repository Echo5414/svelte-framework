if (typeof window !== 'undefined' && !customElements.get('app-shell')) {
    class AppShellElement extends HTMLElement {
        private shadow: ShadowRoot;
        private shouldResize: boolean; // NEW: flag to check if resizing is allowed

        constructor() {
            super();
            this.shadow = this.attachShadow({ mode: 'open' });
            console.log('AppShellElement constructor called');
            this.shouldResize = false; // Initialize it to false by default
        }

        connectedCallback(): void {
            console.log('AppShellElement connected');
            this.render();

            const sidebarLeft = this.querySelector('[slot="sidebar-left"]');
            // Überprüfen Sie, ob das resize-Attribut auf "true" gesetzt ist
            if (sidebarLeft && sidebarLeft.getAttribute('resize') === 'true') {
                this.shouldResize = true;
                sidebarLeft.classList.add('resizable'); // Fügen Sie die Klasse hinzu
            }

            if (this.shouldResize) {
                this.addResizerEvents();
            }
        }

        get sidebarInitialWidth() {
            // Beispiel: Rückgabe eines Standardwerts oder Abrufen des Werts aus den Styles
            return (
                parseInt(getComputedStyle(this).getPropertyValue('--sidebarLeftInitialWidth'), 10) || 320
            );
        }

        private render(): void {
            console.log('AppShellElement render called');
            const hasHeader: boolean = !!this.querySelector('[slot="header"]');
            const hasSidebarLeft: boolean = !!this.querySelector('[slot="sidebar-left"]');
            const hasSidebarRight: boolean = !!this.querySelector('[slot="sidebar-right"]');
            const hasFooter: boolean = !!this.querySelector('[slot="footer"]');

            // Query the width of each section based on child elements
            const sidebarLeftWidth: string = (this.querySelector('[slot="sidebar-left"]') as HTMLElement)?.getAttribute('col') || '4';
            const headerWidth: string = (this.querySelector('[slot="header"]') as HTMLElement)?.getAttribute('col') || '12';
            const mainWidth: string = (this.querySelector('[slot="main"]') as HTMLElement)?.getAttribute('col') || '12';
            const sidebarRightWidth: string = (this.querySelector('[slot="sidebar-right"]') as HTMLElement)?.getAttribute('col') || '4';
            const footerWidth: string = (this.querySelector('[slot="footer"]') as HTMLElement)?.getAttribute('col') || '20';

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

            const sidebarLeft = this.querySelector('[slot="sidebar-left"]');
            const isResizable = sidebarLeft && sidebarLeft.getAttribute('resize') === 'true';

            this.shadowRoot!.innerHTML = `
                <style>
                    :host {
                        display: block;
                        height: 100vh;
                        width: 100vw;
                    }
                    
                    .grid-container {
                        display: grid;
                        height: 100%;
                        width: 100%;
                        grid-template-columns: ${columns};
                        grid-template-rows: var(--grid-template-rows);
                        grid-template-areas: var(--grid-template-areas);
                        background-color: var(--primary-color);
                    }
                    
                    ::slotted([slot="header"]) {
                        grid-area: header;
                    }

                    ::slotted([slot="sidebar-left"]) {
                        grid-area: sidebar-left;
                        position: relative;
                    }
        
                    ::slotted([slot="sidebar-left"].resizable)::after {
                        content: '';
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
                    <slot name="sidebar-left" class="${isResizable ? 'resizable' : ''}"></slot>
                    <slot name="main"></slot>
                    ${hasSidebarRight ? '<slot name="sidebar-right"></slot>' : ''}
                    ${hasFooter ? '<slot name="footer"></slot>' : ''}
                </div>
            `;

            if (hasSidebarLeft && this.shouldResize) {
                this.addResizerEvents();
            }
            this.updateGridTemplateColumns(this.sidebarInitialWidth);
            const resizerExists = this.shadowRoot.querySelector('.resizer') !== null;
            console.log('Resizer exists:', resizerExists);
        }

        private updateGridTemplateColumns(sidebarWidth: number): void {
            console.log('Updating grid template columns:', sidebarWidth);
            const gridContainer = this.shadowRoot.querySelector('.grid-container');
            if (gridContainer) {
                sidebarWidth = Math.max(100, Math.min(sidebarWidth, 600));
                gridContainer.style.gridTemplateColumns = `${sidebarWidth}px 1fr`;
            }
        }

        private addResizerEvents(): void {
            console.log('Adding resizer events');

            const sidebarLeft = this.querySelector('[slot="sidebar-left"]');
            if (!sidebarLeft) {
                console.error('Sidebar-left element not found');
                return;
            }

            let isResizing = false;
            let initialWidth;
            let startX;

            const handleMouseMove = (e) => {
                if (!isResizing) return;
                const newWidth = initialWidth + e.clientX - startX;
                this.updateGridTemplateColumns(newWidth);
            };

            sidebarLeft.addEventListener('mousedown', (e) => {
                const rect = sidebarLeft.getBoundingClientRect();
                if (e.clientX > rect.right - 10 && e.clientX < rect.right) {
                    console.log('Resizer mousedown', e);
                    isResizing = true;
                    startX = e.clientX;
                    initialWidth = sidebarLeft.clientWidth;
                    document.addEventListener('mousemove', handleMouseMove);
                    document.addEventListener('mouseup', stopResize);
                }
            });

            const stopResize = () => {
                console.log('Stop resizing');
                isResizing = false;
                document.removeEventListener('mousemove', handleMouseMove);
                document.removeEventListener('mouseup', stopResize);
            };
        }
    }

    customElements.define('app-shell', AppShellElement);
}
export { };
