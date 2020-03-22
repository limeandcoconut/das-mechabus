<template>
  <div v-if="showErrorMessage" class="error-box">
    <LaserContainer>
      <div class="error-title">ERROR</div>
      <div class="error-message">
        {{ errorMessage }}
      </div>

      <button
        class="dismiss-button"
        @click.prevent="dismissError"
        type="button">
        DISMISS
      </button>
    </LaserContainer>
  </div>
</template>

<script>
import LaserContainer from './laser-container.vue'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'errorBox',

  components: {
    LaserContainer,
  },

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
  top: .basis(2)[];
  right: .basis(2)[];
  width: .basis(20)[];
  height: auto;
  background-color: @dark-navy;
  color: @magenta;
  transform: translate3D(0, 0, 0);
  animation: slide-in .1s ease-in-out both;
  z-index: 2000;
}

.error-title {
  background-color: @dark-navy;
  .rubik();
  font-size: .basis(2)[];
  padding-top: 0.5em;
  padding-bottom: 0.25em;
}

.error-message {
  background-color: @dark-navy;
  padding-bottom: .5em;
  font-size: .basis(2)[];
}

.dismiss-button {
  display: block;
  background-color: @dark-navy;
  width: 100%;
  padding: 1em 0;
  margin: 0;
  border-top: 1px solid @magenta;
  font-weight: inherit;
  color: @magenta;
  cursor: pointer;
}
</style>
