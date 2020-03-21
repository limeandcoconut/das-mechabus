<template>
  <div class="layout">
    <label>
      Login
      <input
        name="password"
        type="password"
        v-model="password"
        required />
    </label>
    <button
      type="submit"
      @click.prevent="login">
      Login
    </button>

  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { defaultMeta } from '../utils'

export default {
  name: 'login',

  metaInfo: defaultMeta,

  data() {
    return {
      password: '',
    }
  },

  methods: {
    async login() {
      if (this.password.length === 0) {
        this.showError('Enter a password')
        return
      }
      try {
        await this.authorize(this.password)
        this.$router.push({ name: 'home' })
      } catch (error) {
      }
    },

    ...mapActions([
      'refreshControllers',
      'showError',
      'authorize',
    ]),
  },
}
</script>
<style lang="less" scoped>
@import '../styles/mixins.less';

.layout {
  background-color: @deep-space-sparkle;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  font-size: .fz(venti)[];
  .rubik(500);
}

</style>
