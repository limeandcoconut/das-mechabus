<template>
  <div
  class="room"
  :class="{lit: state}"/>
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
}
</script>

<style lang="less" scoped>
@import '../styles/mixins.less';

.room {
  position: relative;
  border-left: 2px solid @dark-grey;
  border-top: 2px solid @old-blue;
  border-bottom: 2px solid @old-blue;
  overflow: hidden;

  &:before {
    content: ' ';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: @grey;
    opacity: 0;
    transition: opacity .2s ease-in-out;
  }

  &:after {
    content: ' ';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: @light;
    opacity: 0;
    transition: opacity .2s ease-in-out;
  }

  &:first-of-type {
    border-left: 2px solid @old-blue;
    border-top-left-radius: .basis(2)[];
    border-bottom-left-radius: .basis(2)[];
  }

  &:last-of-type {
    border-right: 2px solid @old-blue;
    border-top-right-radius: .basis(2)[];
    border-bottom-right-radius: .basis(2)[];
  }

  &:hover {
    &:before {
      opacity: 0;
    }

    &:after {
      opacity: 1;
    }
  }

  &.lit {
    &:hover {
      &:before {
        opacity: 1;
      }

      &:after {
        opacity: 0;
      }
    }
  }
}

</style>
