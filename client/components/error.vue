<template>
  <div v-if="showErrorMessage" class="error-box">
    <div class="error-title">ERROR</div>
    <div class="error-message">
      {{ errorMessage }}
    </div>

    <button class="dismiss-button" @click.prevent="dismissError" type="button">DISMISS</button>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'errorBox',
  computed: {
    ...mapState(['showErrorMessage', 'errorMessage']),
  },
  methods: {
    ...mapActions(['dismissError']),
  },
}
</script>

<style lang="less">
@import '../styles/mixins.less';

@keyframes slide-in {
  0% {
    transform: translate3D(calc(100% + .basis(2)[]), 0 ,0)
  }
  100% {
    transform: translate3D(0, 0, 0)
  }
}

.error-box {
  text-align: center;
  position: fixed;
  top: .basis(1)[];
  right: .basis(2)[];
  width: .basis(30)[];
  height: auto;
  padding-top: 1em;
  background-color: @deep-space-sparkle;
  border: 2px solid @eggshell;
  z-index: 200;
  overflow: hidden;
  line-height: 1.2;
  font-weight: 500;
  color: @eggshell;
  transform: translate3D(0, 0, 0);
  animation: slide-in .3s ease-in-out both;
}

.error-title {
  font-size: .basis(2)[];
  padding-bottom: 0.5em;
  .oxanium();
}

.error-message {
  font-size: .basis(2)[];
  padding-bottom: 1em;
}

.dismiss-button {
  display: block;
  background-color: @deep-space-sparkle;
  width: 100%;
  padding: 1em 0;
  margin: 0;
  border-top: 2px solid @eggshell;
  font-weight: inherit;
  color: @eggshell;
  cursor: pointer;
}
</style>
