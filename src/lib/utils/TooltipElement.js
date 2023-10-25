export function initializeTooltips() {
  const elementsWithTooltip = document.querySelectorAll('[tooltipDescription]');
  
  elementsWithTooltip.forEach(element => {
      const tooltip = new Tooltip(element);
  });
}

class Tooltip {
  constructor(element) {
      this._element = element;
      this._tooltipContent = element.getAttribute('tooltipDescription');
      this._tooltipPosition = element.getAttribute('tooltipPosition') || "top";
      this._tooltipElement = document.createElement("div");
      this._tooltipElement.style.position = "absolute";
      this._tooltipElement.style.visibility = "hidden";
      // ... Add more default styles as needed ...

      document.body.appendChild(this._tooltipElement); // Add tooltip to body to avoid overflow issues
      
      this._element.addEventListener('mouseenter', this.showTooltip.bind(this));
      this._element.addEventListener('mouseleave', this.hideTooltip.bind(this));
  }

  showTooltip(event) {
      this._tooltipElement.textContent = this._tooltipContent;
      const rect = this._element.getBoundingClientRect();
      switch(this._tooltipPosition) {
          case 'top':
              this._tooltipElement.style.left = `${rect.left + rect.width / 2}px`;
              this._tooltipElement.style.top = `${rect.top - 30}px`;  // Adjust positioning values as needed
              this._tooltipElement.style.zIndex = '1000';  // Make sure the tooltip is on top of other content
              this._tooltipElement.style.pointerEvents = 'none'; // Ensure the tooltip doesn't interfere with other interactions
              break;
          case 'left':
              // ... Handle left position ...
              break;
          // ... Handle other positions ...
      }
      this._tooltipElement.style.visibility = "visible";
  }

  hideTooltip() {
      this._tooltipElement.style.visibility = "hidden";
  }
}

export {};
