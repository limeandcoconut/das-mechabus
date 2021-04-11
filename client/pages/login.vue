<template>
  <div class="layout">
    <div class="container">
      <form
        onsubmit="return false;"
        @submit.prevent="login">
        <LaserContainer>
          <input
            v-model="password"
            class="password"
            type="password"
            name="password"
            autofocus />
        </LaserContainer>
      </form>

      <LaserButton
        class="submit"
        @click.prevent="login">
        login
      </LaserButton>
    </div>

  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { defaultMeta } from '../utils'
import LaserContainer from '../components/laser-container.vue'
import LaserButton from '../components/laser-button.vue'

export default {
  name: 'login',

  components: {
    LaserContainer,
    LaserButton,
  },

  metaInfo: defaultMeta,

  data () {
    return {
      password: '',
    }
  },

  methods: {
    async login () {
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
      'showError',
      'authorize',
    ]),
  },
}
</script>
<style lang="less" scoped>
@import '../styles/mixins.less';

.layout {
  background-color: @dark-navy;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  font-size: .fz(venti)[];
  .rubik(500);

  .container {
    display: flex;
    align-content: center;
    justify-content: center;

    .password {
      background-color: transparent;
      padding: .basis(1)[];
      border: none;
      height: 100%;
      color: @magenta;
    }
  }
}

</style>
