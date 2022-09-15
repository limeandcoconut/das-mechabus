<template>
  <div class="loading">
    loading
    <div class="line"></div>
    <div class="line"></div>
    <div class="line"></div>
    <div class="line"></div>
  </div>
</template>

<script>
export default {
  name: 'loading',
}
</script>

<style lang="less" scoped>
@import '../styles/mixins.less';

@keyframes scan {
  0% {
    transform: translateY(0.5em) scaleY(2);
  }
  30% {
    transform: translateY(0.09em) scaleY(1.4);
  }
  45% {
    transform: translateY(-0.07em) scaleY(1.2);
  }
  50% {
    transform: translateY(-0.12em) scaleY(1);
  }
  60% {
    transform: translateY(-0.28em) scaleY(1.3);
  }
  80% {
    transform: translateY(-0.5em) scaleY(.7);
  }
  100% {
    transform: translateY(-.8em) scaleY(.8);
  }
}

@keyframes unscan {
  0% {
    transform: translateY(-.5em) scaleY(.8);
  }
  30% {
    transform: translateY(-0.09em) scaleY(.7);
  }
  45% {
    transform: translateY(0.07em) scaleY(1.3);
  }
  50% {
    transform: translateY(0.12em) scaleY(1);
  }
  60% {
    transform: translateY(0.28em) scaleY(1.2);
  }
  80% {
    transform: translateY(0.5em) scaleY(1.4);
  }
  100% {
    transform: translateY(0.8em) scaleY(2);
  }
}

.loading {
  position: relative;
  background-color: inherit;
  max-width: 300px;
  color: @magenta;
  font-size: .fz(tetra)[];
  overflow: hidden;
  text-align: center;
  .rmn();

  .line {
    position: absolute;
    left: 0;
    width: 100%;
    background-color: inherit;
    animation: scan 3s linear infinite;
    bottom: 0.5em;
    height: 0.03em;

    &:nth-child(2) {
      background-color: @white;
      height: 0.02em;
      top: 0.1em;
      animation: unscan 6s linear .2s infinite;
      opacity: 0.15;
    }

    &:nth-child(3) {
      background-color: lighten(@very-dark, .8%);
      height: 0.07em;
      bottom: 0.4em;
      animation: scan 4s linear .1s infinite;
      opacity: 0.9;
    }

    &:last-of-type {
      height: 0.1em;
      bottom: 0.1em;
      animation: scan 2.8s linear .2s infinite;
      opacity: 0.75;
    }
  }
}

</style>
