<template>
  <div
    class="room"
    :class="{
      lit: state,
      disabled,
      locked,
      'animate-out': animateOut,
      'animate-in': animateIn,
    }"
    @click="handleClick"
    @mouseleave="locked = false"/>
</template>

<script>
export default {
  name: 'room',

  props: {
    state: {
      type: Number,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },

  data () {
    return {
      locked: false,
      animateIn: false,
      animateOut: false,
    }
  },

  methods: {
    handleClick () {
      if (this.disabled) {
        return
      }
      this.locked = true
      const key = this.state ? 'animateOut' : 'animateIn'
      this[key] = true
      setTimeout(() => {
        this[key] = false
      }, 1050)
    },
  },
}
</script>

<style lang="less" scoped>
@import '../styles/mixins.less';

@keyframes border {
  0% {
    opacity: 0;
  }
  1% {
    opacity: .8;
  }
  10% {
    opacity: .8;
  }
  30% {
    opacity: 0;
  }
  35% {
    opacity: 1;
  }
  60% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

.room {
  position: relative;
  background-color: @mid-grey;
  border-top: 4px solid @very-dark;
  cursor: pointer;

  &:before {
    content: ' ';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    padding: 1px;
    background-color: @yellow;
    opacity: 0;
    transition: opacity .2s ease-in;
  }

  &.disabled {
    background-color: @very-dark;

    &:hover:before {
      opacity: 0;
    }
  }

  &.locked:hover:before {
    opacity: 0;
  }

  &:after {
    content: ' ';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    padding: 1px;
    border: 1vh solid @light;
    opacity: 0;
    animation: none;
  }

  &.animate-in {
    &:after {
      animation: border 1s linear both;
    }
  }

  &.animate-out {
    &:after {
      animation: border 1s linear both;
      border-color: @hot-shade;
    }
  }

  &:hover {
    &:before {
      opacity: 1;
    }
  }

  &.lit {
    &:before, &.locked:hover:before {
      opacity: 1;
    }

    &:hover {
      &:before {
        opacity: 0;
      }
    }
  }

  &:first-of-type {
    border-top: none;
  }
}

</style>
