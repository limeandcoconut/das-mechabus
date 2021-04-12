<template>
  <div
    class="radio"
    :class="{
      checked,
    }"
    @click="$emit('click')">
    <input
      type="radio"
      :id="_uid"
      :name="name"
      :value="value"
      class="input"
      :checked="checked">
    <LaserContainer
      class="container">
      <div class="check-fill"/>
    </LaserContainer>
    <label
      :for="_uid"
      class="label">
      <slot/>
    </label>
  </div>
</template>

<script>
import LaserContainer from './laser-container.vue'

export default {
  name: 'radio-input',

  components: {
    LaserContainer,
  },

  props: {
    checked: {
      type: Boolean,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
  },

  computed: {

  },

}
</script>

<style lang="less" scoped>
@import '../styles/mixins.less';

.radio {
  display: flex;
  align-items: baseline;

  .input {
    display: none;
  }

  .container {
    margin-right: 0.25rem;
  }

  .check-fill {
    position: relative;
    background-color: @white;
    width: 1rem;
    height: 1rem;
    opacity: 0;
    transition: opacity .08s ease-in;

    &:before {
      background-color: @magenta;
      content: ' ';
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      transition-delay: .3s;
      transition: opacity .18s ease-in-out;
    }
  }

  &.checked {
    .check-fill {
      opacity: 1;

      &:before {
        opacity: 1;
      }
    }
  }
}

</style>
