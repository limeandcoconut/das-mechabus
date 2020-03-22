<template>
  <div class="layout">
    <div class="header">
      <div class="title">
        Das Mechabus
        <div class="line"></div>
        <div class="line"></div>
        <div class="line"></div>
      </div>
      <div class="right-content">
        <LaserButton
          class="header-button"
          @click="refreshControllers">
          refresh
        </LaserButton>
        <LaserButton
          class="header-button"
          @click="logout">
          logout
        </LaserButton>
      </div>
    </div>
    <div class="status card"></div>
    <div class="power card"></div>
    <div class="bus-container card">
      <Bus class="bus"/>
    </div>
    <div class="big card"></div>
  </div>
</template>

<script>
import {
  host,
  og,
  twitter,
} from '../../config/meta.config'
import Bus from '../components/bus.vue'
import LaserButton from '../components/laser-button.vue'
import { extendMeta } from '../utils'
import { mapActions } from 'vuex'

export default {
  name: 'home',

  components: {
    Bus,
    LaserButton,
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
  background-color: @dark-navy;
  display: grid;
  grid-template-rows:  1fr 1fr ;
  grid-template-columns: repeat(12, 1fr);
  grid-template-areas:
  "status status status power  power  power  power  power  power  bus   bus   bus"
  "big    big    big    big    big    big    big    big    big    bus   bus   bus"
  "big    big    big    big    big    big    big    big    big    bus   bus   bus";
  grid-column-gap: .basis(3)[];
  grid-row-gap: .basis(3)[];
  height: 100vh;
  padding: .basis(3)[];
  padding-top: .basis(12)[];
  font-size: .fz(venti)[];
  .rubik(500);

  .header {
    background-color: inherit;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: .basis(8)[];
    padding: 0 .basis(3)[];
    justify-self: stretch;
    color: @white;
    z-index: 1000;
    font-size: .fz(giga)[];
    .rmn();

    .title {
      position: relative;
      background-color: inherit;
      color: @magenta;

      .line {
        position: absolute;
        bottom: 0;
        left: 0;
        height: .3rem;
        width: 100%;
        background-color: inherit;
        transform: translateY(-1.95rem);

        &:nth-child(2) {
          height: 0.4rem;
          transform: translateY(-1.35rem);
        }

        &:last-of-type {
          height: 0.5rem;
          transform: translateY(-0.73rem);
        }
      }
    }

    .right-content {
      display: flex;
      align-items: flex-end;

      .header-button {
        margin-left: .basis(2)[];
      }
    }
  }

  .card {
    background-color: @very-dark;
    justify-self: stretch;
  }

  .bus-container {
    display: flex;
    justify-content: center;
    align-items: center;
    grid-area: bus;
  }

  .status {
    grid-area: status;
  }

  .power {
    grid-area: power;
  }

  .big {
    grid-area: big;
  }
}

</style>
