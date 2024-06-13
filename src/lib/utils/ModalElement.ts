class AppModal extends HTMLElement {
    private dialog: HTMLDialogElement | null;
    private closeButton: HTMLButtonElement | null;
  
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.shadowRoot!.innerHTML = `
        <style>
          /* dialog {} */
        </style>
        <dialog part="dialog">
          <button class="close-button" aria-label="Close" part="dialog-close-button">&#10005;</button>
          <slot></slot> <!-- Default slot for content -->
        </dialog>
      `;
  
      this.dialog = this.shadowRoot!.querySelector('dialog');
      this.closeButton = this.shadowRoot!.querySelector('.close-button');
      if (this.closeButton) {
        this.closeButton.addEventListener('click', () => this.close());
      }
    }
  
    connectedCallback() {
      const id = this.getAttribute('id');
      if (id) {
        this.id = id;
      }
      if (this.hasAttribute('open')) {
        this.open();
      }
  
      // Automatically bind toggle button if it exists
      const toggleButton = document.querySelector(`button[data-modal-target="${this.id}"]`);
      if (toggleButton) {
        toggleButton.addEventListener('click', () => this.toggle());
      }
    }
  
    static get observedAttributes() {
      return ['open'];
    }
  
    attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
      if (name === 'open') {
        if (newValue !== null) {
          this.open();
        } else {
          this.close();
        }
      }
    }
  
    open() {
      if (this.dialog && !this.hasAttribute('open')) {
        this.dialog.showModal();
        this.setAttribute('open', '');
      }
    }
  
    close() {
      if (this.dialog) {
        this.dialog.close();
        this.removeAttribute('open');
      }
    }
  
    toggle() {
      if (this.hasAttribute('open')) {
        this.close();
      } else {
        this.open();
      }
    }
  }
  
  customElements.define('app-modal', AppModal);
  
  export { AppModal };
  