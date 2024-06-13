// app-dropdown.ts
console.log('DropdownElement.ts loaded...');
class AppDropdown extends HTMLElement {
  private isOpen: boolean = false;
  private toggleListener: EventListener;
  private documentClickListener: EventListener;

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.innerHTML = `
      <style>
        :host { display: block; position: relative; }
        .dropdown-content {
          display: none;
          position: absolute;
          
        }
        .show { display: block; }
        .dropdown-content a::after {
          content: '';
          display: none;
        }
        .dropdown-content a.selected::after {
          content: '✔';
          display: inline-block;
          margin-left: 5px;
        }
      </style>
      <button id="dropdownButton">Menü</button>
      <div class="dropdown-content" part="dropdown-content">
        <slot></slot>
      </div>
    `;

    // We use a bound function so that we can remove the event listener later
    this.toggleListener = this.toggleDropdown.bind(this);
    this.documentClickListener = this.handleDocumentClick.bind(this);

    shadow.querySelector('#dropdownButton')!.addEventListener('click', this.toggleListener);

    // Event delegation to handle clicks on slotted anchor elements
    shadow.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      // Check if the clicked element is an anchor within the slotted content
      if (target.tagName.toLowerCase() === 'a') {
        this.handleLinkClick(target);
      }
    });
  }

  connectedCallback() {
    document.addEventListener('click', this.documentClickListener);
  }

  disconnectedCallback() {
    document.removeEventListener('click', this.documentClickListener);
  }

  toggleDropdown(event: Event) {
    this.isOpen = !this.isOpen;
    this.updateDropdown();
    event.stopPropagation(); // Stop the click from reaching the document
  }

  handleDocumentClick(event: Event) {
    // Close dropdown if open and click is outside the component
    if (this.isOpen && !this.contains(event.target as Node)) {
      this.isOpen = false;
      this.updateDropdown();
    }
  }

  updateDropdown() {
    const dropdownContent = this.shadowRoot!.querySelector('.dropdown-content');
    if (dropdownContent) {
      if (this.isOpen) {
        dropdownContent.classList.add('show');
      } else {
        dropdownContent.classList.remove('show');
      }
    }
  }

  handleLinkClick(target: HTMLElement) {
    // Remove 'selected' class from all links
    this.shadowRoot!.querySelectorAll('.dropdown-content a').forEach((link) => {
      link.classList.remove('selected');
    });
    // Add 'selected' class to the clicked link
    target.classList.add('selected');
  }
}
customElements.define('app-dropdown', AppDropdown);
export { };
