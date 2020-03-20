<template>
  <div class="layout">
    <div class="header">
      Das Mechabus
      <button
        class="refresh header-button"
        type="button"
        @click="refreshControllers">
        refresh
      </button>
      <button
        class="logout header-button"
        type="button"
        @click="logout">
        logout
      </button>
    </div>
    <Bus class="bus"/>
  </div>
</template>

<script>
import {
  host,
  og,
  twitter,
} from '../../config/meta.config'
import Bus from '../components/bus.vue'
import { extendMeta } from '../utils'
import { mapActions } from 'vuex'

export default {
  name: 'home',

  components: {
    Bus,
  },

  metaInfo: () => extendMeta({
    meta: [
      { property: 'og:image', content: og.image.src },
      { property: 'og:image:width', content: og.image.width },
      { property: 'og:image:height', content: og.image.height },
      { property: 'og:type', content: og.type },
      { property: 'og:url', content: host },
      { property: 'twitter:image', content: twitter.image.src },
      { property: 'twitter:image:alt', content: twitter.image.alt },
      { property: 'twitter:card', content: twitter.card },
      { name: 'twitter:creator', content: twitter.creator },
    ],
    link: [
      { rel: 'canonical', href: 'https://jacobsmith.tech' },
    ],
  }),

  methods: {
    logout() {
      this.deauthorize()
      this.$router.push({ name: 'login' })
    },

    ...mapActions([
      'refreshControllers',
      'deauthorize',
    ]),
  },
}
</script>
<style lang="less" scoped>
@import '../styles/mixins.less';

.layout {
  background-color: @deep-space-sparkle;
  display: grid;
  grid-template:  auto  / repeat(12, 1fr);
  grid-template-areas: "header header header header header header header header header header header header";
  grid-column-gap: .basis(2)[];
  grid-row-gap: .basis(1)[];
  align-items: start;
  align-content: start;
  height: 100vh;
  perspective: 60em;
  font-size: .fz(venti)[];
  .oxanium(500);

  .header {
    background-color: @yankees-blue;
    grid-area: header;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: .basis(3)[] calc(100% / 12);
    margin-bottom: .basis(2)[];
    justify-self: stretch;
    color: @eggshell;

    .header-button {
      background-color: transparent;
      padding: .basis(1)[];
      border: 1px solid @eggshell;
      color: @eggshell;
    }
  }

  .bus {
    grid-column: 2 / span 10;
    grid-row: 3 / span 1;
  }

  .above(md; {
    // grid-template: auto / 1fr .basis(80)[] 1fr;
  });

  .above(lg; {
    // grid-template: auto / 1fr .basis(70)[] 1fr;
  });
}

</style>
