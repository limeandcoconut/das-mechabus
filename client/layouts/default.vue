<template>
  <div class="wrapper default scanlines">
    <main>
      <error></error>

      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import error from '../components/error.vue'

export default {
  components: {
    error,
  },
}
</script>

<style lang="less" scoped>
@import '../styles/mixins.less';

// Height of 1 scanline (min.: 1px)
@scan-height: 2px;
// Emulates a damage-your-eyes bad pre-2000 CRT screen ♥
// FPS should be > 1
@scan-fps: 60;
@scan-color: rgba(black, .2);

// Set to 2147483648, or more, to enable scanlines on Chrome fullscreen (doesn't work in Firefox or IE);
@scan-z-index: 2147483648;
@scan-opacity: .75;
.scanlines {
  position: relative;
  overflow: hidden;

  &:before,
  &:after {
    display: block;
    pointer-events: none;
    content: '';
    position: absolute;
  }

  // Unique scanline travelling on the screen
  &:before {
    width: 100%;
    height: @scan-height * 1;
    z-index: @scan-z-index + 1;
    background: @scan-color;
    opacity: .75;
    animation: scanline 6s linear infinite;
  }

  // Scanlines
  &:after {
    background: linear-gradient( to bottom, transparent 50%, @scan-color 51%);
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: @scan-z-index;
    background-size: 100% @scan-height*2;
    animation: scanlines 1s steps(@scan-fps) infinite;
  }
}

@keyframes scanline {
  0% {
    transform: translate3d(0,200000%,0);
    // To have a continuous scanline move, use this line this
    // bottom: 0%;
    // &:before, { position: absolute; bottom: 100%; }
  }
}

@keyframes scanlines {
  0% {
    background-position: 0 50%;
    // To have a continuous scanline move, use this line this
    // bottom: 0%;
    // &:before, { position: absolute; bottom: 100%; }
  }
}
</style>
