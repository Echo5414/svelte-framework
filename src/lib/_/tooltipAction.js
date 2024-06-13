export function tooltip(node, { tooltipDescription, tooltipPosition }) {
  // Create tooltip element
  const tooltipEl = document.createElement('div');
  tooltipEl.className = `tooltip-text ${tooltipPosition}`;
  tooltipEl.innerText = tooltipDescription;
  document.body.appendChild(tooltipEl);

  node.addEventListener('mouseenter', function(event) {
      const rect = node.getBoundingClientRect();
      tooltipEl.style.visibility = 'visible';
      
      switch (tooltipPosition) {
          case 'top':
              tooltipEl.style.top = `${rect.top - tooltipEl.offsetHeight}px`;
              tooltipEl.style.left = `${rect.left + rect.width / 2 - tooltipEl.offsetWidth / 2}px`;
              break;
          case 'right':
              // ... (similar logic for other positions)
              break;
          // ... (handle other positions)
      }
  });

  node.addEventListener('mouseleave', function() {
      tooltipEl.style.visibility = 'hidden';
  });

  // Cleanup
  return {
      destroy() {
          document.body.removeChild(tooltipEl);
      }
  };
}
