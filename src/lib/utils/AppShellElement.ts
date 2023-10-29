console.log('AppShellElement.ts loaded...');

class AppShellElement extends HTMLElement {
	private shadow: ShadowRoot;
	private isResizing = false;
	private initialWidth: number | undefined;
	private initialHeight: number | undefined;
	private startX: number | undefined;
	private startY: number | undefined;
	private resizingSection: HTMLElement | null = null;

	private boundHandleMouseMove: (event: MouseEvent) => void;
	private boundStopResize: () => void;

	private addGlobalListeners(): void {
		document.addEventListener('mousemove', this.boundHandleMouseMove);
		document.addEventListener('mouseup', this.boundStopResize);
	}

	private removeGlobalListeners(): void {
		document.removeEventListener('mousemove', this.boundHandleMouseMove);
		document.removeEventListener('mouseup', this.boundStopResize);
	}

	constructor() {
		super();
		this.shadow = this.attachShadow({ mode: 'open' });
		this.boundHandleMouseMove = this.handleMouseMove.bind(this);
		this.boundStopResize = this.stopResize.bind(this);
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
    const sidebarLeft = this.querySelector('[slot="sidebar-left"]') as HTMLElement | null;
    if (sidebarLeft) {
        const originalWidth = sidebarLeft.clientWidth;
        const simulatedWidth = originalWidth + 1;
        this.updateSectionWidth(sidebarLeft, simulatedWidth);
        setTimeout(() => {
            this.updateSectionWidth(sidebarLeft, originalWidth);
        }, 100);
    }
}


	private initializeLayout(): void {
		const sidebarLeft = this.querySelector('[slot="sidebar-left"]');
		const sidebarRight = this.querySelector('[slot="sidebar-right"]');

		if (sidebarLeft) {
			const initialLeftWidth = `${sidebarLeft.clientWidth || 256}px`;
			document.documentElement.style.setProperty('--sidebarLeftWidth', initialLeftWidth);
		}

		if (sidebarRight) {
			const initialRightWidth = `${sidebarRight.clientWidth || 256}px`;
			document.documentElement.style.setProperty('--sidebarRightWidth', initialRightWidth);
		}

		this.offsetWidth;
	}

	private render(): void {
		console.log('AppShellElement render called');
		const hasHeader: boolean = !!this.querySelector('[slot="header"]');
		const hasSidebarLeft: boolean = !!this.querySelector('[slot="sidebar-left"]');
		const hasSidebarRight: boolean = !!this.querySelector('[slot="sidebar-right"]');
		const hasFooter: boolean = !!this.querySelector('[slot="footer"]');

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
                        background-color: var(--bodyBackgroundColor);
                    }
                    
                    ::slotted([slot="header"]) {
                        grid-area: header;
                        position: relative;
                    }

                    ::slotted([slot="sidebar-left"]) {
                        grid-area: sidebar-left;
                        position: relative;
                    }

                    ::slotted([slot="main"]) {
                        grid-area: main;
                        position: relative;
                    }

                    ::slotted([slot="sidebar-right"]) {
                        grid-area: sidebar-right;
                        position: relative;
                    }

                    ::slotted([slot="footer"]) {
                        grid-area: footer;
                        position: relative;
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
    void this.offsetWidth; // New approach, avoids warnings
	}


	private initializeResizableSections(): void {
		const resizableSections = this.querySelectorAll('[resize="true"]');
		resizableSections.forEach((section) => {
			section.addEventListener('mousedown', this.handleVerticalResize as EventListener);
			this.addResizerEvents(section, 'right');
		});
		const header = this.querySelector('[slot="header"]');
		if (header && header.getAttribute('resize') === 'true') {
			this.addResizerEvents(header, 'bottom');
		}

		const footer = this.querySelector('[slot="footer"]');
		if (footer && footer.getAttribute('resize') === 'true') {
			this.addResizerEvents(footer, 'top');
		}
	}

	private addResizerEvents(
    section: HTMLElement,
    resizeEdge: 'left' | 'right' | 'top' | 'bottom'
): void {
		section.addEventListener('mousedown', (event: Event) => {
			const mouseEvent = event as MouseEvent;
			if (this.isResizerClicked(mouseEvent, section, resizeEdge)) {
				this.isResizing = true;
				this.startX = mouseEvent.clientX;
				this.startY = mouseEvent.clientY;
				this.initialWidth = section.clientWidth;
				this.initialHeight = section.clientHeight;
				this.resizingSection = section;
				document.addEventListener('mousemove', this.boundHandleMouseMove);
				document.addEventListener('mouseup', this.boundStopResize);
				this.addGlobalListeners();
			}
		});
	}

	private handleMouseMove(event: Event): void {
		const mouseEvent = event as MouseEvent;
		if (
			!this.isResizing ||
			!this.resizingSection ||
			this.startX === undefined ||
			this.startY === undefined
		)
			return;

		if (
			this.resizingSection.getAttribute('slot') === 'sidebar-left' ||
			this.resizingSection.getAttribute('slot') === 'sidebar-right'
		) {
			this.handleHorizontalResize(mouseEvent);
		}

		if (
			this.resizingSection.getAttribute('slot') === 'header' ||
			this.resizingSection.getAttribute('slot') === 'footer'
		) {
			this.handleVerticalResize(mouseEvent);
		}
	}

	private handleHorizontalResize(mouseEvent: MouseEvent): void {
    console.log('handleHorizontalResize called');

    if (!(this.resizingSection instanceof HTMLElement)) {
        console.error('resizingSection is not an HTMLElement');
        return;
    }

    if (this.startX === undefined || this.initialWidth === undefined) {
        return;
    }

    const changeInWidth = this.resizingSection.getAttribute('slot') === 'sidebar-right'
        ? this.startX - mouseEvent.clientX
        : mouseEvent.clientX - this.startX;

    const newWidth = this.initialWidth + changeInWidth;

    const property = this.resizingSection.getAttribute('slot') === 'sidebar-right'
        ? '--sidebarRightWidth'
        : '--sidebarLeftWidth';

    document.documentElement.style.setProperty(property, `${newWidth}px`);
    this.updateSectionWidth(this.resizingSection, newWidth);
	}

	private handleVerticalResize(mouseEvent: MouseEvent): void {
    console.log('handleVerticalResize called');

    if (!(this.resizingSection instanceof HTMLElement)) {
        console.error('resizingSection is not an HTMLElement');
        return;
    }

    if (this.startY === undefined || this.initialHeight === undefined) {
        return;
    }

    const changeInHeight = mouseEvent.clientY - this.startY;
    let newHeight;

    if (this.resizingSection.getAttribute('slot') === 'footer') {
        newHeight = this.initialHeight - changeInHeight;
    } else {
        newHeight = this.initialHeight + changeInHeight;
    }

    console.log(`New Height: ${newHeight}`);
    
    this.updateSectionHeight(this.resizingSection, newHeight);
	}

	private stopResize(): void {
		this.isResizing = false;
		this.removeGlobalListeners();
		this.resizingSection = null;
	}

	private isResizerClicked(
		e: MouseEvent,
		element: Element,
		resizeEdge: 'left' | 'right' | 'top' | 'bottom'
	): boolean {
		const rect = element.getBoundingClientRect();
		const resizerSize = 10;

		const checkMap = {
			left: e.clientX > rect.left && e.clientX < rect.left + resizerSize,
			right: e.clientX > rect.right - resizerSize && e.clientX < rect.right,
			top: e.clientY > rect.top && e.clientY < rect.top + resizerSize,
			bottom: e.clientY > rect.bottom - resizerSize && e.clientY < rect.bottom
		};

		return checkMap[resizeEdge] || false;
	}

	private updateSectionHeight(section: HTMLElement, newHeight: number): void {
    const style = getComputedStyle(document.documentElement);
    const minHeight = parseInt(style.getPropertyValue('--footerMinHeight'), 10);
    const maxHeight = parseInt(style.getPropertyValue('--footerMaxHeight'), 10);

    newHeight = Math.max(minHeight, Math.min(newHeight, maxHeight));
    section.style.height = `${newHeight}px`;

    console.log(`Updated Height: ${section.style.height}`);
}


	private updateSectionWidth(section: HTMLElement, newWidth: number): void {
		const minWidth = 100;
		const maxWidth = Math.min(600, window.innerWidth - 100);

		newWidth = Math.max(minWidth, Math.min(newWidth, maxWidth));
		section.style.width = `${newWidth}px`;

		if (section.getAttribute('slot') === 'sidebar-left') {
			this.updateGridLayout(newWidth, 'left');
		}

		console.log(`Resizing ${section.getAttribute('slot')}`);
		console.log(`New Width: ${newWidth}`);
		console.log(`Computed Style Width: ${section.style.width}`);
	}

	private updateGridLayout(newWidth: number, sidebar: 'left' | 'right'): void {
			const gridContainer = this.shadowRoot?.querySelector('.grid-container') as HTMLElement | null;
			if (!gridContainer) return;

			const columns = gridContainer.style.gridTemplateColumns.split(' ');

			if (sidebar === 'left') {
					columns[0] = `${newWidth}px`;
			} else if (sidebar === 'right') {
					columns[2] = `${newWidth}px`;
			}
			gridContainer.style.gridTemplateColumns = columns.join(' ');
	}
}

if (typeof window !== 'undefined' && !customElements.get('app-shell')) {
	customElements.define('app-shell', AppShellElement);
}
export {};
