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
    <div class="status"></div>
    <div class="power"></div>
    <div class="bus-container">
      <Bus class="bus"/>
    </div>
    <div class="big"></div>
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
  // align-items: start;
  // align-content: stretch;
  height: 100vh;
  padding: .basis(3)[];
  padding-top: .basis(12)[];
  font-size: .fz(venti)[];
  .rubik(500);

  // .header-background {
  //   content: ' ';
  //   background-color: @white;
  //   position: fixed;
  //   top: 0;
  //   left: 0;
  //   right: 0;
  //   height: .basis(8)[];
  //   z-index: 100;
  // }

  .header {
    // background-color: @very-dark;
    background-color: inherit;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: .basis(8)[];
    // background-color: @yankees-blue;
    // grid-area: header;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 .basis(3)[];
    // padding-top: .basis(6)[] ;
    // margin-bottom: .basis(2)[];
    justify-self: stretch;
    // color: @eggshell;
    color: @white;
    z-index: 1000;
    // background: @black;
    // background: linear-gradient(white 0%, white 48%, @eerie-black 48%,  @eerie-black 100%);
    // // background: linear-gradient(@black 0%, @black 80%, transparent 80%,  transparent 100%);
    // -webkit-background-clip: text;
    // -webkit-text-fill-color: transparent;
    font-size: .fz(giga)[];
 .rmn();
  // border: 1px soild red;

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
        // transform: rotate(-4deg) translateY(0.05rem);
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
      // background-color: @dark-navy;

      .header-button {
        margin-left: .basis(2)[];
      }
    }
  }

  .bus-container {
    display: flex;
    justify-content: center;
    align-items: center;
    // grid-column: 2 / span 10;
    // grid-row: 3 / span 1;
    background-color: @very-dark;
    align-self: stretch;
    justify-self: stretch;
    grid-area: bus;
  }

  .status {
    background-color: @very-dark;
    // align-self: stretch;
    justify-self: stretch;
    grid-area: status;
  }

  .power {
    // background-color: @taupe;
    background-color: @very-dark;
    // align-self: stretch;
    justify-self: stretch;
    grid-area: power;
  }

  .big {
    background-color: @very-dark;
    // align-self: stretch;
    justify-self: stretch;
    grid-area: big;
  }

  .above(md; {
    // grid-template: auto / 1fr .basis(80)[] 1fr;
  });

  .above(lg; {
    // grid-template: auto / 1fr .basis(70)[] 1fr;
  });
}

</style>
