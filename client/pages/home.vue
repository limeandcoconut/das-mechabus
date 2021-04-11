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
    <Loading
      v-if="!loaded"
    />
    <template v-else>
      <div class="water card">
        <WaterSystem />
      </div>
      <div class="power card"></div>
      <div class="bus-container card">
        <Bus class="bus"/>
      </div>
      <div class="big card"></div>
    </template>
  </div>
</template>

<script>
import {
  host,
  og,
  twitter,
} from '../../config/meta.config'
import Loading from '../components/loading.vue'
import Bus from '../components/bus.vue'
import WaterSystem from '../components/water-system.vue'
import LaserButton from '../components/laser-button.vue'
import { extendMeta } from '../utils'
import { mapActions } from 'vuex'

export default {
  name: 'home',

  components: {
    Loading,
    LaserButton,
    Bus,
    WaterSystem,
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

  data () {
    return {
      loaded: false,
    }
  },

  async mounted  () {
    try {
      await this.refreshControllers(true)
      this.loaded = true
    } catch (error) {
      this.showError(error)
      return
    }
  },

  methods: {
    logout () {
      this.deauthorize()
      this.$router.push({ name: 'login' })
    },

    blinkLight () {
      console.log('foo')
      this.send({
        type: 'operate',
        data: {
          gpio: 17,
        },
      })
    },

    ...mapActions([
      'refreshControllers',
      'deauthorize',
      'send',
    ]),
  },
}
</script>
<style lang="less" scoped>
@import '../styles/mixins.less';

.layout {
  background-color: @dark-navy;
  display: grid;
  grid-template-rows:  auto;
  grid-template-columns: 1fr 1fr;
  grid-template-areas:
  "bus bus"
  "water water"
  "power power"
  "big big";
  grid-column-gap: .basis(3)[];
  grid-row-gap: .basis(3)[];
  // height: 100vh;
  padding: .basis(3)[];
  padding-top: .basis(14)[];
  font-size: .fz(venti)[];
  .rubik(500);

  .above(sm; {
    grid-template-columns: repeat(12, 1fr);
    grid-template-areas:
    "water water water water water bus    bus    bus    bus    bus    bus    bus"
    "big    big    big    big    big    bus    bus    bus    bus    bus    bus    bus"
    "big    big    big    big    big    bus    bus    bus    bus    bus    bus    bus"
    "power  power  power  power  power  power  power  power  power  power  power  power";
    padding-top: .basis(18)[];
  });

  .above(md; {
    grid-template-columns: repeat(12, 1fr);
    grid-template-areas:
    "water water water power  power  power  power  power  bus    bus   bus   bus"
    "big    big    big    big    big    big    big    big    bus    bus   bus   bus"
    "big    big    big    big    big    big    big    big    bus    bus   bus   bus";
  });

  .above(lg; {
    padding-top: .basis(12)[];
    grid-template-areas:
    "water water water power  power  power  power  power  power  bus   bus   bus"
    "big    big    big    big    big    big    big    big    big    bus   bus   bus"
    "big    big    big    big    big    big    big    big    big    bus   bus   bus";
  });

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
    height: auto;
    padding: 0 .basis(3)[];
    justify-self: stretch;
    color: @white;
    z-index: 1000;
    font-size: .fz(tetra)[];
    .rmn();

    .above(sm; {
      font-size: .fz(giga)[];
    });

    .above(lg; {
      height: .basis(8)[];
    });

    .title {
      position: relative;
      background-color: inherit;
      max-width: 300px;
      color: @magenta;

      .above(sm; {
        max-width: 600px;
      });

      .above(lg; {
        max-width: none;
      });

      .line {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 0.08em;
        background-color: inherit;
        transform: translateY(-.52em);

        &:nth-child(2) {
          height: 0.1em;
          transform: translateY(-.36em);
        }

        &:last-of-type {
          height: 0.13em;
          transform: translateY(-0.2em);
        }

        .above(sm; {
          height: .3rem;
          transform: translateY(-1.95rem);

          &:nth-child(2) {
            height: 0.4rem;
            transform: translateY(-1.35rem);
          }

          &:last-of-type {
            height: 0.5rem;
            transform: translateY(-0.73rem);
          }
        });
      }
    }

    .right-content {
      display: flex;
      position: absolute;
      align-items: center;
      top: 0;
      right: .basis(3)[];
      height: .px(.min-font-sizes[@tetra])[];

      .above(390px; {
        position: static;
        align-items: flex-end;
      });

      .above(sm; {
        position: absolute;
        align-items: center;
        height: .px(.min-font-sizes[@giga])[];
      });

      .above(570px; {
        position: static;
        align-items: flex-end;
        height: auto;
      });

      .header-button:last-of-type {
        margin-left: .basis(2)[];

        .above(md; {
          margin-left: .6rem;
        });

        .above(lg; {
          margin-left: .basis(2)[];
        });
      }
    }
  }

  .card {
    background-color: @very-dark;
    justify-self: stretch;
    min-height: 20em;

    .above(md; {
      min-height: auto;
    });
  }

  .bus-container {
    display: flex;
    justify-content: center;
    align-items: center;
    grid-area: bus;
    min-height: auto;
    padding: .basis(5)[];
  }

  .water {
    grid-area: water;
  }

  .power {
    grid-area: power;
  }

  .big {
    grid-area: big;
  }
}

</style>
