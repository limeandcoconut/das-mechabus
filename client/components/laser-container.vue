<template>
  <div
    class="container"
    :style="`color: ${fill}`">
    <div class="line"></div>
    <div class="line"></div>
    <div class="line"></div>
    <div class="content">
      <slot/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'laser-container',

  props: {
    fill: {
      type: String,
      default: '#222432',
    },
  },
}
</script>

<style lang="less" scoped>
@import '../styles/mixins.less';

.container {
  position: relative;
  background-color: currentColor;
  font-size: .fz(lg)[];
  color: @dark-navy;
  z-index: 0;
  overflow: hidden;

  .content {
    position: relative;
    top: 1px;
    left: 1px;
    width: calc(100% - 2px);
    height: calc(100% - 2px);
    padding-bottom: 2px;
    color: @magenta;
  }

  &:before {
    content: ' ';
    background-color: @magenta;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
  }

  &:after {
    content: ' ';
    background-color: currentColor;
    position: absolute;
    top: 1px;
    left: 1px;
    right: 1px;
    bottom: 1px;
    width: calc(100% - 2px);
    height: calc(100% - 2px);
    z-index: -1;
  }

  .line {
    position: absolute;
    bottom: 0;
    right: -2%;
    height: 100%;
    width: 104%;
    border-bottom: 10px solid;
    border-color: @pink-sherbet;
    transform: translate3d(0%, calc(-100% - 4px), 0);
    transition:none;
    z-index: -1;

    &:nth-child(2) {
      border-bottom: 12px solid;
      border-color: currentColor;
    }

    &:nth-child(3) {
      border-bottom: 6px solid;
      border-color: @pink-sherbet;

    }
  }

  &:hover {
    .line {
      transform:translate3d(0, calc(100% + 4px), 0);
      transition: transform .33s ease-in-out;

      &:nth-child(2) {
        transition: transform .23s ease-in;
        transition-delay: .1s;
      }

      &:nth-child(3) {
        transition: transform .33s ease-in-out;
        transition-delay: .22s;
      }
    }
  }
}

</style>
