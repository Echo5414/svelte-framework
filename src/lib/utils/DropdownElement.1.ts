console.log('DropdownElement.ts loaded...');
class DropdownElement extends HTMLElement {
  private shadow: ShadowRoot;
  private isOpen: boolean = false;

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.closeDropdown = this.closeDropdown.bind(this);
    console.log('DropdownElement constructor called');
  }

  connectedCallback(): void {
    console.log('DropdownElement connected');
    this.render();
    this.addEventListeners();
  }

  private render(): void {
    const options = this.getAttribute('options')?.split(',') || [];

    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = `
                <style>
                    .dropdown {
                        position: relative;
                        display: inline-block;
                    }

                    .dropdown-content {
                        display: ${this.isOpen ? 'block' : 'none'};
                        position: absolute;
                        background-color: #f9f9f9;
                        min-width: 160px;
                        box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
                        z-index: 1;
                    }

                    .dropdown-content a {
                        color: black;
                        padding: 12px 16px;
                        text-decoration: none;
                        display: block;
                    }

                    .dropdown-content a:hover {
                        background-color: #f1f1f1;
                    }
                </style>

                <div class="dropdown">
                    <button>Dropdown</button>
                    <div class="dropdown-content">
                        ${options.map(option => `<a href="#">${option}</a>`).join('')}
                    </div>
                </div>
            `;
    }
  }

  private addEventListeners(): void {
    const button = this.shadowRoot?.querySelector('button');
    const links = this.shadowRoot?.querySelectorAll('.dropdown-content a');
    const dropdownContent = this.shadowRoot?.querySelector('.dropdown-content');

    if (button) {
      button.addEventListener('click', this.toggleDropdown);
    }

    if (links) {
      links.forEach(link => {
        link.addEventListener('click', this.closeDropdown);
      });
    }

    /*         this.addEventListener('click', (event) => {
                if (this.shadowRoot && !this.shadowRoot.contains(event.target as Node)) {
                    this.closeDropdown();
                }
            }); */
    if (dropdownContent) {
      dropdownContent.addEventListener('click', (event) => event.stopPropagation());
    }
  }

  private toggleDropdown(): void {
    this.isOpen = !this.isOpen;
    this.render();
  }

  private closeDropdown(): void {
    if (this.isOpen) {
      this.isOpen = false;
      this.render();
    }
  }
}
customElements.define('custom-dropdown', DropdownElement);
export { };
