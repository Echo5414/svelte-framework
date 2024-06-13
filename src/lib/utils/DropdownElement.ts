// app-dropdown.ts
console.log('DropdownElement.ts loaded...');

class AppDropdown extends HTMLElement {
  private isOpen: boolean = false;
  private toggleElement: ChildNode;
  private documentClickListener: EventListener;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' }).innerHTML = `
      <style>
        :host { display: block; position: relative; }
        ::slotted(nav) {
          display: none;
        }
        ::slotted(nav.show) {
          display: block;
          position: absolute;
          z-index: 10;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
          background: white;
        }
        ::slotted(a.selected) {
          background-color: red; /* Example selected state style */
          color: black;
        }
        /* Additional styles */
      </style>
      <slot></slot>
    `;

    this.documentClickListener = this.handleDocumentClick.bind(this);
    this.toggleElement = this.querySelector('button')!;
  }

  connectedCallback() {
    this.toggleElement.addEventListener('click', this.toggleDropdown.bind(this));
  
    this.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      if (target.tagName.toLowerCase() === 'a') {
        this.handleLinkClick(target);
      }
    });
  
    document.addEventListener('click', this.documentClickListener);
  }

  disconnectedCallback() {
    this.toggleElement.removeEventListener('click', this.toggleDropdown.bind(this));
    document.removeEventListener('click', this.documentClickListener);
  }

  toggleDropdown(event: Event) {
    this.isOpen = !this.isOpen;
    this.updateDropdown();
    event.stopPropagation();
  }

  handleDocumentClick(event: Event) {
    if (this.isOpen && !this.contains(event.target as Node)) {
      this.isOpen = false;
      this.updateDropdown();
    }
  }

  updateDropdown() {
    const slotElement = this.shadowRoot!.querySelector('slot')!;
    const slottedElements = slotElement.assignedElements();
    slottedElements.forEach((element) => {
      if (element.tagName.toLowerCase() === 'nav') {
        element.classList.toggle('show', this.isOpen);
      }
    });
  }

  handleLinkClick(target: HTMLElement) {
    // Get the assigned nodes for the slot, which includes <nav> and its descendants
    const slotElement = this.shadowRoot!.querySelector('slot')!;
    const slottedElements = slotElement.assignedNodes({flatten: true});
  
    // Now we need to find all the anchor elements within these nodes
    const links = Array.from(slottedElements)
      .filter(node => node.nodeType === Node.ELEMENT_NODE) // Filter out non-element nodes
      .flatMap(node => Array.from((node as HTMLElement).querySelectorAll('a'))); // Find all 'a' elements
  
    // Remove the 'selected' class from all links
    links.forEach(link => {
      link.classList.remove('selected');
    });
  
    // Add the 'selected' class to the clicked link
    target.classList.add('selected');
  }
  
}

customElements.define('app-dropdown', AppDropdown);

export {};