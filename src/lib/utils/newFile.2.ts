if (typeof window !== 'undefined' && !customElements.get('app-shell')) {
    class AppShellElement extends HTMLElement {
        private shadow: ShadowRoot;
        private isResizing = false;
        private initialWidth: number;
        private startX: number;
        private resizingSection: Element | null = null;

        constructor() {
            super();
            this.shadow = this.attachShadow({ mode: 'open' });
            console.log('AppShellElement constructor called');
        }

        connectedCallback(): void {
            console.log('AppShellElement connected');
            this.initializeLayout();
            this.render();
            this.initializeResizableSections();
            this.simulateResizeAction();
        }

        private simulateResizeAction(): void {
            // Simulate a resize action on the sidebar-left
            const sidebarLeft = this.querySelector('[slot="sidebar-left"]');
            if (sidebarLeft) {
                const originalWidth = sidebarLeft.clientWidth;
                const simulatedWidth = originalWidth + 1; // Slightly increase the width
                this.updateSectionWidth(sidebarLeft, simulatedWidth);
                setTimeout(() => {
                    this.updateSectionWidth(sidebarLeft, originalWidth); // Reset to original width
                }, 100); // Adjust the timeout as needed
            }
        }

        private initializeLayout(): void {
            const sidebarLeft = this.querySelector('[slot="sidebar-left"]');
            const sidebarRight = this.querySelector('[slot="sidebar-right"]');

            if (sidebarLeft) {
                const initialLeftWidth = sidebarLeft.clientWidth || 320; // Default width or some initial value
                document.documentElement.style.setProperty('--sidebarLeftWidth', `${initialLeftWidth}px`);
            }

            if (sidebarRight) {
                const initialRightWidth = sidebarRight.clientWidth || 160; // Default width or some initial value
                document.documentElement.style.setProperty('--sidebarRightWidth', `${initialRightWidth}px`);
            }

            // Force layout update
            this.offsetWidth;
        }

        private render(): void {
            console.log('AppShellElement render called');
            const hasHeader: boolean = !!this.querySelector('[slot="header"]');
            const hasSidebarLeft: boolean = !!this.querySelector('[slot="sidebar-left"]');
            const hasSidebarRight: boolean = !!this.querySelector('[slot="sidebar-right"]');
            const hasFooter: boolean = !!this.querySelector('[slot="footer"]');

            const sidebarLeftWidth: string = (this.querySelector('[slot="sidebar-left"]') as HTMLElement)?.getAttribute('col') || '4';
            const headerWidth: string = (this.querySelector('[slot="header"]') as HTMLElement)?.getAttribute('col') || '12';
            const mainWidth: string = (this.querySelector('[slot="main"]') as HTMLElement)?.getAttribute('col') || '12';
            const sidebarRightWidth: string = (this.querySelector('[slot="sidebar-right"]') as HTMLElement)?.getAttribute('col') || '4';
            const footerWidth: string = (this.querySelector('[slot="footer"]') as HTMLElement)?.getAttribute('col') || '20';

            const columns: string = `${sidebarLeftWidth}fr ${mainWidth}fr ${sidebarRightWidth}fr`;

            const sections: NodeListOf<HTMLElement> = this.querySelectorAll('app-section');
            let customStyles: string = '';

            sections.forEach((section, index) => {
                const col: string | null = section.getAttribute('col');
                const gap: string | null = section.getAttribute('gap');

                const gridColumns: string = col ? `repeat(${col}, minmax(0, 1fr))` : '1fr';
                const gridGap: string = gap ? `${gap}px` : '0px';

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
            const sidebarRight = this.querySelector('[slot="sidebar-right"]');
            const isRightResizable = sidebarRight && sidebarRight.getAttribute('resize') === 'true';

            if (this.shadowRoot) {
                this.shadowRoot.innerHTML = `
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

                    ::slotted([slot="main"]) {
                        grid-area: main;
                    }

                    ::slotted([slot="sidebar-right"]) {
                        grid-area: sidebar-right;
                        position: relative;
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
            }

            if (hasSidebarLeft && isResizable) {
                this.addResizerEvents(sidebarLeft, 'right');
            }

            if (hasSidebarRight && isRightResizable) {
                this.addResizerEvents(sidebarRight, 'left');
            }

            const resizerExists = this.shadowRoot && this.shadowRoot.querySelector('.resizer') !== null;
            console.log('Resizer exists:', resizerExists);
            this.triggerReflow();
        }

        private triggerReflow(): void {
            const _ = this.offsetWidth;
        }

        private initializeResizableSections(): void {
            const resizableSections = this.querySelectorAll('[resize="true"]');
            resizableSections.forEach((section) => {
                section.classList.add('resizable');
                this.addResizerEvents(section);
            });
        }

        private addResizerEvents(section: Element, resizeEdge: 'left' | 'right'): void {
            section.addEventListener('mousedown', (event: Event) => {
                const mouseEvent = event as MouseEvent;
                if (this.isResizerClicked(mouseEvent, section, resizeEdge)) {
                    this.isResizing = true;
                    this.startX = mouseEvent.clientX;
                    this.initialWidth = section.clientWidth;
                    this.resizingSection = section;
                    document.addEventListener('mousemove', this.handleMouseMove.bind(this) as EventListener);
                    document.addEventListener('mouseup', this.stopResize.bind(this) as EventListener);
                }
            });
        }

        private handleMouseMove(event: Event): void {
            const mouseEvent = event as MouseEvent;
            if (!this.isResizing || !this.resizingSection) return;

            let newWidth;

            if (this.resizingSection?.getAttribute('slot') === 'sidebar-right') {
                const changeInWidth = this.startX - mouseEvent.clientX;
                newWidth = this.initialWidth + changeInWidth;
                document.documentElement.style.setProperty('--sidebarRightWidth', `${newWidth}px`);
            } else if (this.resizingSection?.getAttribute('slot') === 'sidebar-left') {
                const changeInWidth = mouseEvent.clientX - this.startX;
                newWidth = this.initialWidth + changeInWidth;
                document.documentElement.style.setProperty('--sidebarLeftWidth', `${newWidth}px`);
            }

            this.updateSectionWidth(this.resizingSection, newWidth);
        }

        private stopResize(): void {
            this.isResizing = false;
            document.removeEventListener('mousemove', this.handleMouseMove.bind(this));
            document.removeEventListener('mouseup', this.stopResize.bind(this));
            this.resizingSection = null;
        }

        private isResizerClicked(
            e: MouseEvent,
            element: Element,
            resizeEdge: 'left' | 'right'
        ): boolean {
            const rect = element.getBoundingClientRect();
            const resizerWidth = 10;
            if (resizeEdge === 'left') {
                return e.clientX > rect.left && e.clientX < rect.left + resizerWidth;
            } else {
                return e.clientX > rect.right - resizerWidth && e.clientX < rect.right;
            }
        }

        private updateSectionWidth(section: Element, newWidth: number): void {
            const minWidth = 100;
            const maxWidth = Math.min(600, window.innerWidth - 100);

            newWidth = Math.max(minWidth, Math.min(newWidth, maxWidth));
            section.style.width = `${newWidth}px`;

            if (section.getAttribute('slot') === 'sidebar-left') {
                this.updateGridLayout(newWidth, 'left');
            }
        }

        private updateGridLayout(newWidth: number, sidebar: 'left' | 'right'): void {
            const gridContainer = this.shadowRoot?.querySelector('.grid-container');
            if (!gridContainer) return;

            let columns = gridContainer.style.gridTemplateColumns.split(' ');
            if (sidebar === 'left') {
                columns[0] = `${newWidth}px`;
            } else if (sidebar === 'right') {
                columns[2] = `${newWidth}px`;
            }
            gridContainer.style.gridTemplateColumns = columns.join(' ');
        }

    }

    customElements.define('app-shell', AppShellElement);
}
export { };
