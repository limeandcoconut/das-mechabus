<template>
  <LaserContainer
    :fill="fill">
    <button
      class="button"
      type="button"
      @click.prevent="$emit('click', $event)">
      <slot/>
    </button>
  </LaserContainer>
</template>

<script>
import LaserContainer from './laser-container.vue'

export default {
  name: 'laser-button',

  components: {
    LaserContainer,
  },

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

.button {
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: .basis(1)[];
  color: @magenta;
  cursor: pointer;
}

</style>
