console.log('TooltipElement.ts loaded...');
interface TooltipElement extends HTMLElement {
	tooltipDescription?: string;
	tooltipPosition?: 'top' | 'left' | 'right' | 'bottom';
}

export function initializeTooltips(): void {
	const elementsWithTooltip = document.querySelectorAll<TooltipElement>('[tooltipDescription]');
	elementsWithTooltip.forEach((element) => new Tooltip(element));
}
class Tooltip {
	private _element: TooltipElement;
	private _tooltipContent: string;
	private _tooltipPosition: 'top' | 'left' | 'right' | 'bottom' = 'top';
	private _tooltipElement!: HTMLDivElement;

	constructor(element: TooltipElement) {
		this._element = element;
		this._tooltipContent = element.getAttribute('tooltipDescription') || '';
		const positionAttribute = element.getAttribute('tooltipPosition');
		if (positionAttribute) {
			this._tooltipPosition = positionAttribute as 'top' | 'left' | 'right' | 'bottom';
		}

		this._createTooltipElement();
		this._attachEventListeners();
	}

	private _createTooltipElement(): void {
		this._tooltipElement = document.createElement('div');
		this._tooltipElement.className = 'tooltip-content';
		this._tooltipElement.style.position = 'absolute';
		this._tooltipElement.style.visibility = 'hidden';
		this._tooltipElement.style.zIndex = '1000';
		this._tooltipElement.style.pointerEvents = 'none';

		const shadowRoot = this._tooltipElement.attachShadow({ mode: 'open' });

    shadowRoot.innerHTML = `
      <style>
          .tooltip-content {
              /* other styles */
          }
      </style>
      <div class="tooltip-content"></div>
    `;


		this._element.appendChild(this._tooltipElement);
	}

	private _attachEventListeners(): void {
		this._element.addEventListener('mouseenter', () => this.showTooltip());
		this._element.addEventListener('mouseleave', () => this.hideTooltip());
	}

	private _setPosition(): void {
		const rect = this._element.getBoundingClientRect();
		switch (this._tooltipPosition) {
			case 'top':
				this._tooltipElement.style.left = `${rect.left + rect.width / 2}px`;
				this._tooltipElement.style.top = `${rect.top - 30}px`;
				break;
			case 'left':
				this._tooltipElement.style.left = `${rect.left - 30}px`;
				this._tooltipElement.style.top = `${rect.top + rect.height / 2}px`;
				break;
			case 'right':
				this._tooltipElement.style.left = `${rect.right + 10}px`;
				this._tooltipElement.style.top = `${rect.top + rect.height / 2}px`;
				break;
			case 'bottom':
				this._tooltipElement.style.left = `${rect.left + rect.width / 2}px`;
				this._tooltipElement.style.top = `${rect.bottom + 10}px`;
				break;
		}
	}

	showTooltip(): void {
		const tooltipContentDiv = this._tooltipElement.shadowRoot?.querySelector('.tooltip-content');
		if (tooltipContentDiv) {
			tooltipContentDiv.textContent = this._tooltipContent;
		}
		this._setPosition();
		this._tooltipElement.style.visibility = 'visible';
	}

	hideTooltip(): void {
		this._tooltipElement.style.visibility = 'hidden';
	}
}
