console.log('IconElement.ts loaded...');

const icons = {
	'icon-user': {
			id: 'icon-user',
			viewBox: '0 0 16 16',
			alt: 'User Icon',
			pathData: 'M6.233.371a4.388 4.388 0 0 1 5.002 1.052c.421.459.713.992.904 1.554.143.421.263 1.173.22 1.894-.078 1.322-.638 2.408-1.399 3.316l-.127.152a.75.75 0 0 0 .201 1.13l2.209 1.275a4.75 4.75 0 0 1 2.375 4.114V16H.382v-1.143a4.75 4.75 0 0 1 2.375-4.113l2.209-1.275a.75.75 0 0 0 .201-1.13l-.126-.152c-.761-.908-1.322-1.994-1.4-3.316-.043-.721.077-1.473.22-1.894a4.346 4.346 0 0 1 .904-1.554c.411-.448.91-.807 1.468-1.052zM8 1.5a2.888 2.888 0 0 0-2.13.937 2.85 2.85 0 0 0-.588 1.022c-.077.226-.175.783-.143 1.323.054.921.44 1.712 1.051 2.442l.002.001.127.153a2.25 2.25 0 0 1-.603 3.39l-2.209 1.275A3.25 3.25 0 0 0 1.902 14.5h12.196a3.25 3.25 0 0 0-1.605-2.457l-2.209-1.275a2.25 2.25 0 0 1-.603-3.39l.127-.153.002-.001c.612-.73.997-1.52 1.052-2.442.032-.54-.067-1.097-.144-1.323a2.85 2.85 0 0 0-.588-1.022A2.888 2.888 0 0 0 8 1.5z'
	},
	'icon-layerzero': {
			id: 'icon-layerzero',
			viewBox: '0 0 19 33.34',
			alt: 'LayerZero Logo',
			pathData: 'm9.5,0h0Zm9.5,20.6v3.1c0,1.3-.2,2.5-.7,3.7s-1.2,2.2-2.1,3.1c-2.7,2.8-6.8,3.6-10.4,2.1-1.2-.5-2.2-1.2-3.1-2.1-.9-.9-1.6-2-2.1-3.1-.4-1.1-.6-2.4-.6-3.6v-3.1c0-2.1.8-4,2.3-5.5,1.4-1.4,3.4-2.3,5.4-2.3H0v-3.2c0-1.3.2-2.6.7-3.7.5-1.2,1.2-2.2,2.1-3.1.8-.9,1.9-1.7,3.1-2.1,1.1-.5,2.4-.8,3.6-.8,1.3,0,2.5.2,3.6.7,1.2.5,2.2,1.2,3.1,2.1,1.8,1.9,2.8,4.3,2.8,6.9v3.2c0,1-.2,2-.6,3-.4.9-1,1.8-1.7,2.5-1.4,1.4-3.4,2.3-5.4,2.3h7.7v-.1Zm-7.7,0h0v-12.4c0-.4-.2-.9-.5-1.2-.3-.3-.7-.5-1.2-.5h-.2c-.4,0-.9.2-1.2.5-.3.4-.5.8-.5,1.2v4.6h0v12.4c0,.2,0,.4.1.6.3.6.9,1,1.5,1h.3c.4,0,.9-.2,1.2-.5s.5-.7.5-1.2c0,0,0-4.5,0-4.5Z'
	},
	'icon-home': {
			id: 'icon-home',
			viewBox: '0 0 24 24',
			alt: 'Home Icon',
			pathData: 'M13.5 1.515a3 3 0 0 0-3 0L3 5.845a2 2 0 0 0-1 1.732V21a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-6h4v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V7.577a2 2 0 0 0-1-1.732l-7.5-4.33z'
	},
	'icon-search': {
			id: 'icon-home',
			viewBox: '0 0 24 24',
			alt: 'Search Icon',
			pathData: 'M10.533 1.279c-5.18 0-9.407 4.14-9.407 9.279s4.226 9.279 9.407 9.279c2.234 0 4.29-.77 5.907-2.058l4.353 4.353a1 1 0 1 0 1.414-1.414l-4.344-4.344a9.157 9.157 0 0 0 2.077-5.816c0-5.14-4.226-9.28-9.407-9.28zm-7.407 9.279c0-4.006 3.302-7.28 7.407-7.28s7.407 3.274 7.407 7.28-3.302 7.279-7.407 7.279-7.407-3.273-7.407-7.28z'
	},
	'icon-library': {
			id: 'icon-library',
			viewBox: '0 0 24 24',
			alt: 'Library Icon',
			pathData: 'M3 22a1 1 0 0 1-1-1V3a1 1 0 0 1 2 0v18a1 1 0 0 1-1 1zM15.5 2.134A1 1 0 0 0 14 3v18a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V6.464a1 1 0 0 0-.5-.866l-6-3.464zM9 2a1 1 0 0 0-1 1v18a1 1 0 1 0 2 0V3a1 1 0 0 0-1-1z'
	},
	'icon-arrowLeft': {
			id: 'icon-arrowLeft',
			viewBox: '0 0 16 16',
			alt: 'Arrow Left Icon',
			pathData: 'M11.03.47a.75.75 0 0 1 0 1.06L4.56 8l6.47 6.47a.75.75 0 1 1-1.06 1.06L2.44 8 9.97.47a.75.75 0 0 1 1.06 0z'
	},
	'icon-arrowRight': {
			id: 'icon-arrowRight',
			viewBox: '0 0 16 16',
			alt: 'Arrow Right Icon',
			pathData: 'M4.97.47a.75.75 0 0 0 0 1.06L11.44 8l-6.47 6.47a.75.75 0 1 0 1.06 1.06L13.56 8 6.03.47a.75.75 0 0 0-1.06 0z'
	},
	'icon-download': {
			id: 'icon-download',
			viewBox: '0 0 16 16',
			alt: 'Download Icon',
			pathData: 'M4.995 8.745a.75.75 0 0 1 1.06 0L7.25 9.939V4a.75.75 0 0 1 1.5 0v5.94l1.195-1.195a.75.75 0 1 1 1.06 1.06L8 12.811l-.528-.528a.945.945 0 0 1-.005-.005L4.995 9.805a.75.75 0 0 1 0-1.06z'
	},
	'icon-plus': {
			id: 'icon-plus',
			viewBox: '0 0 16 16',
			alt: 'Plus/Add Icon',
			pathData: 'M15.25 8a.75.75 0 0 1-.75.75H8.75v5.75a.75.75 0 0 1-1.5 0V8.75H1.5a.75.75 0 0 1 0-1.5h5.75V1.5a.75.75 0 0 1 1.5 0v5.75h5.75a.75.75 0 0 1 .75.75z'
	},
	'icon-showMore': {
			id: 'icon-showMore',
			viewBox: '0 0 16 16',
			alt: 'Show More Icon',
			pathData: 'M7.19 1A.749.749 0 0 1 8.47.47L16 7.99l-7.53 7.521a.75.75 0 0 1-1.234-.815.75.75 0 0 1 .174-.243l5.72-5.714H.75a.75.75 0 1 1 0-1.498h12.38L7.41 1.529a.749.749 0 0 1-.22-.53z'
	},
	'icon-compact': {
			id: 'icon-compact',
			viewBox: '0 0 16 16',
			alt: 'Compact Icon',
			pathData: 'M15.5 13.5H.5V12h15v1.5zm0-4.75H.5v-1.5h15v1.5zm0-4.75H.5V2.5h15V4z'
	},
	'icon-list': {
			id: 'icon-list',
			viewBox: '0 0 16 16',
			alt: 'List Icon',
			pathData: 'M15 14.5H5V13h10v1.5zm0-5.75H5v-1.5h10v1.5zM15 3H5V1.5h10V3zM3 3H1V1.5h2V3zm0 11.5H1V13h2v1.5zm0-5.75H1v-1.5h2v1.5z'
	},
	'icon-grid': {
			id: 'icon-grid',
			viewBox: '0 0 16 16',
			alt: 'Grid Icon',
			pathData: 'M1 1h6v6H1V1zm1.5 1.5v3h3v-3h-3zM1 9h6v6H1V9zm1.5 1.5v3h3v-3h-3zM9 1h6v6H9V1zm1.5 1.5v3h3v-3h-3zM9 9h6v6H9V9zm1.5 1.5v3h3v-3h-3z'
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
							img {
								width: 100%;
								height: 100%;
								display: block;
						}
					</style>
					`;

					this.shadowRoot!.innerHTML = styles + iconContent;
			}

			connectedCallback(): void {
				const specifiedWidth = parseFloat(this.getAttrOrDefault('width', '64'));
				const specifiedHeight = parseFloat(this.getAttrOrDefault('height', '64'));
		
				const type = this.textContent?.trim() as keyof typeof icons || 'icon-user';
				const icon = icons[type];
				const [ , , viewBoxWidth, viewBoxHeight] = icon.viewBox.split(' ').map(Number);
		
				const aspectRatio = viewBoxWidth / viewBoxHeight;
		
				if (this.hasAttribute('width') && !this.hasAttribute('height')) {
						this.style.width = specifiedWidth + "px";
						this.style.height = (specifiedWidth / aspectRatio) + "px";
				}
				else if (!this.hasAttribute('width') && this.hasAttribute('height')) {
						this.style.height = specifiedHeight + "px";
						this.style.width = (specifiedHeight * aspectRatio) + "px";
				}
				else {
						this.style.width = specifiedWidth + "px";
						this.style.height = specifiedHeight + "px";
				}
				
				this.generateContent();
				this.style.visibility = 'visible';
		}
		
		
	}

	customElements.define('app-icon', AppIconElement);
}

export {};