<template>
  <div
    class="room"
    :class="{
      lit: state,
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
  },

  data() {
    return {
      locked: false,
      animateIn: false,
      animateOut: false,
    }
  },

  methods: {
    handleClick() {
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
  background-color: @taupe-grey;
  border-top: 4px solid @hot-shade;
  // border-left: 4px solid @eerie-black;
  // border-right: 4px solid @eerie-black;
  // overflow: hidden;
  // transform: translate3d(0, 0, 0);
  // perspective: 0;

  &:before {
    content: ' ';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    padding: 1px;
    background-color: @baby-powder;
    opacity: 0;
    transition: opacity .2s ease-in;
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
    // background-color: @ash-grey;
    opacity: 0;
    animation: none;
    // transition: opacity .2s ease-in;
  }

  &.animate-in {
    // border: 2px solid red;
    &:after {
        animation: border 1s linear both;
    //  border-color: @middle-blue;
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

    // &:after {
    //   opacity: 1;
    // }
  }

  &.lit {
    &:before, &.locked:hover:before {
      opacity: 1;
    }

    // &:after {
    //   opacity: 1;
    // }

    &:hover {
      &:before {
        opacity: 0;
      }

      // &:after {
      //   opacity: 1;
      // }
    }

    // &.locked {
    //   &:hover {
    //     &:before {
    //       opacity: 1;
    //     }
    //   }
    // }
  }

  &:first-of-type {
    // border-top: 4px solid @eerie-black;
    border-top: none;
    // border-top-left-radius: .basis(2)[];
    // border-top-right-radius: .basis(2)[];
  }

  &:last-of-type {
    // border-bottom: 4px solid @eerie-black;
    // border-bottom-left-radius: .basis(2)[];
    // border-bottom-right-radius: .basis(2)[];
  }
}

</style>
