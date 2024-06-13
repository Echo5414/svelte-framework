<script>
  export let tooltipDescription = "";
  export let tooltipPosition = "top";
</script>

<div class={`tooltip-container ${tooltipPosition}`}>
  <slot></slot>
  <div class="tooltip-text">{tooltipDescription}</div>
</div>

<style lang="scss">
.tooltip-container {
  position: relative;
  display: inline-block;

  .tooltip-text {
    visibility: hidden;
    width: 120px;
    background-color: #555;
    color: #fff;
    text-align: center;
    padding: 5px;
    border-radius: 6px;
    position: absolute;
    z-index: 1;
    bottom: 125%;
    left: 50%;
    margin-left: -60px;
    opacity: 0;
    transition: opacity 0.3s;
  }

  &:hover .tooltip-text {
    visibility: visible;
    opacity: 1;
  }

  &.top .tooltip-text {
    // default styles for top positioning (if any additional styles)
  }

  &.right .tooltip-text {
    top: 50%;
    bottom: auto;
    left: 100%;
    margin-left: 0;
    transform: translateY(-50%);
  }

  &.bottom .tooltip-text {
    top: 100%;
    bottom: auto;
    left: 50%;
    margin-left: -60px;
  }

  &.left .tooltip-text {
    top: 50%;
    bottom: auto;
    left: 0%;
    margin-left: -130px;
    transform: translateY(-50%);
}


}

</style>
