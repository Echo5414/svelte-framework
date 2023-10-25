//
// IconElements.ts
//
const icons = {
	'icon-user': {
			id: 'icon-user',
			viewBox: '0 0 16 16',
			alt: 'User Icon',
			pathData: 'M6.233.371a4.388 4.388 0 0 1 5.002 1.052c.421.459.713.992.904 1.554.143.421.263 1.173.22 1.894-.078 1.322-.638 2.408-1.399 3.316l-.127.152a.75.75 0 0 0 .201 1.13l2.209 1.275a4.75 4.75 0 0 1 2.375 4.114V16H.382v-1.143a4.75 4.75 0 0 1 2.375-4.113l2.209-1.275a.75.75 0 0 0 .201-1.13l-.126-.152c-.761-.908-1.322-1.994-1.4-3.316-.043-.721.077-1.473.22-1.894a4.346 4.346 0 0 1 .904-1.554c.411-.448.91-.807 1.468-1.052zM8 1.5a2.888 2.888 0 0 0-2.13.937 2.85 2.85 0 0 0-.588 1.022c-.077.226-.175.783-.143 1.323.054.921.44 1.712 1.051 2.442l.002.001.127.153a2.25 2.25 0 0 1-.603 3.39l-2.209 1.275A3.25 3.25 0 0 0 1.902 14.5h12.196a3.25 3.25 0 0 0-1.605-2.457l-2.209-1.275a2.25 2.25 0 0 1-.603-3.39l.127-.153.002-.001c.612-.73.997-1.52 1.052-2.442.032-.54-.067-1.097-.144-1.323a2.85 2.85 0 0 0-.588-1.022A2.888 2.888 0 0 0 8 1.5z'  // Your path data here
	},
	'icon-layerzero': {
			id: 'icon-layerzero',
			viewBox: '0 0 19 33.34',
			alt: 'LayerZero Logo',
			pathData: 'm9.5,0h0Zm9.5,20.6v3.1c0,1.3-.2,2.5-.7,3.7s-1.2,2.2-2.1,3.1c-2.7,2.8-6.8,3.6-10.4,2.1-1.2-.5-2.2-1.2-3.1-2.1-.9-.9-1.6-2-2.1-3.1-.4-1.1-.6-2.4-.6-3.6v-3.1c0-2.1.8-4,2.3-5.5,1.4-1.4,3.4-2.3,5.4-2.3H0v-3.2c0-1.3.2-2.6.7-3.7.5-1.2,1.2-2.2,2.1-3.1.8-.9,1.9-1.7,3.1-2.1,1.1-.5,2.4-.8,3.6-.8,1.3,0,2.5.2,3.6.7,1.2.5,2.2,1.2,3.1,2.1,1.8,1.9,2.8,4.3,2.8,6.9v3.2c0,1-.2,2-.6,3-.4.9-1,1.8-1.7,2.5-1.4,1.4-3.4,2.3-5.4,2.3h7.7v-.1Zm-7.7,0h0v-12.4c0-.4-.2-.9-.5-1.2-.3-.3-.7-.5-1.2-.5h-.2c-.4,0-.9.2-1.2.5-.3.4-.5.8-.5,1.2v4.6h0v12.4c0,.2,0,.4.1.6.3.6.9,1,1.5,1h.3c.4,0,.9-.2,1.2-.5s.5-.7.5-1.2c0,0,0-4.5,0-4.5Z'  // Your path data here
	}
} as const;


if (typeof window !== 'undefined' && !customElements.get('app-icon')) {
	class AppIconElement extends HTMLElement {
			constructor() {
					super();
					this.attachShadow({ mode: 'open' });
			}

			// Helper function to get attribute or default
			private getAttrOrDefault(attr: string, def: string): string {
					return this.getAttribute(attr) || def;
			}

			private getComputedVariable(variable: string): string {
					// If it's a CSS variable (starts with var())
					if (variable.startsWith('var(')) {
							const cssVarName = variable.slice(4, -1).trim();
							return getComputedStyle(document.documentElement).getPropertyValue(cssVarName).trim();
					}
					return variable;
			}

			private encodeColorForSVG(color: string): string {
					return color.replace('#', '%23');
			}

			private generateContent(): void {
					const type = this.textContent?.trim() as keyof typeof icons || 'icon-user';
					const icon = icons[type];

					// Common attributes
					const width: string = this.getAttrOrDefault('width', '64');
					const height: string = this.getAttrOrDefault('height', '64');
					let fill: string = this.getAttrOrDefault('fill', 'black');
					fill = this.getComputedVariable(fill);  
					fill = this.encodeColorForSVG(fill);
					const fillOpacity: string = this.getAttrOrDefault('fill-opacity', '1');
					let stroke: string = this.getAttrOrDefault('stroke', 'none');
					stroke = this.getComputedVariable(stroke);
					stroke = this.encodeColorForSVG(stroke);
					const strokeWidth: string = this.getAttrOrDefault('stroke-width', '1');
					const strokeOpacity: string = this.getAttrOrDefault('stroke-opacity', '1');
					const strokeDasharray: string = this.getAttrOrDefault('stroke-dasharray', '');
					const strokeLinecap: string = this.getAttrOrDefault('stroke-linecap', 'butt');
					const strokeLinejoin: string = this.getAttrOrDefault('stroke-linejoin', 'miter');

					const COMMON_SVG_ATTRIBUTES = `
							id='${icon.id}'
							viewBox='${icon.viewBox}'
							xmlns='http://www.w3.org/2000/svg' 
							width='${width}'
							height='${height}'
					`;
			
					const COMMON_PATH_ATTRIBUTES = `
							fill='${fill}'
							fill-opacity='${fillOpacity}'
							stroke='${stroke}'
							stroke-width='${strokeWidth}'
							stroke-opacity='${strokeOpacity}'
							stroke-dasharray='${strokeDasharray}'
							stroke-linecap='${strokeLinecap}'
							stroke-linejoin='${strokeLinejoin}'
					`;

					const iconContent = `<img src="data:image/svg+xml,%3Csvg ${COMMON_SVG_ATTRIBUTES}%3E%3Cpath d='${icon.pathData}' ${COMMON_PATH_ATTRIBUTES}/%3E%3C/svg%3E" alt="${icon.alt}">`;

					const styles: string = `
					<style>
							/* Any styles for the SVG/icon can be added here */
					</style>
					`;

					this.shadowRoot!.innerHTML = styles + iconContent;
			}

			connectedCallback(): void {
					this.generateContent();
					this.style.visibility = 'visible';
			}
	}

	customElements.define('app-icon', AppIconElement);
}

export {};