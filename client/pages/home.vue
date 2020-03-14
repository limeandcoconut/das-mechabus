<template>
  <div class="layout">
    <div class="header">Das Mechabus</div>
    <Bus class="bus"/>
  </div>
</template>

<script>
import {
  title,
  author,
  description,
  host,
  color,
  og,
  twitter,
  ms,
  manifest,
  favicons,

} from '../../config/meta.config'
import Bus from '../components/bus.vue'
import { isProd } from '../utils'

export default {
  name: 'home',

  components: {
    Bus,
  },

  metaInfo: () => {
    const meta = {
      title,
      meta: [
        { name: 'description', content: description },
        { name: 'author', content: author },
        { property: 'og:title', content: title },
        { property: 'og:description', content: description },
        { property: 'og:image', content: og.image.src },
        { property: 'og:image:width', content: og.image.width },
        { property: 'og:image:height', content: og.image.height },
        { property: 'og:type', content: og.type },
        { property: 'og:url', content: host },
        { property: 'twitter:image', content: twitter.image.src },
        { property: 'twitter:image:alt', content: twitter.image.alt },
        { property: 'twitter:card', content: twitter.card },
        { name: 'twitter:creator', content: twitter.creator },
        { name: 'theme-color', content: color },
        { name: 'msapplication-TileImage', content: favicons.ms },
        { name: 'msapplication-TileColor', content: ms.color },
      ],
      link: [
        { rel: 'canonical', href: 'https://jacobsmith.tech' },
        { rel: 'shortcut icon', href: favicons.default },
        { rel: 'icon', href: favicons.x32, sizes: '32x32', type: 'image/png' },
        { rel: 'icon', href: favicons.x16, sizes: '16x16', type: 'image/png' },
        { rel: 'apple-touch-icon', href: favicons.apple, sizes: '180x180' },
        { rel: 'mask-icon', href: favicons.safariMask, color: color },
        { rel: 'icon', href: favicons.ms },
      // noindex, nofollow can go here too
      ],
    }
    if (isProd()) {
      meta.links.push({ rel: 'manifest', href: manifest })
    }
    return meta
  },
}
</script>
<style lang="less" scoped>
@import '../styles/mixins.less';

.layout {
  background-color: white;
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
    background-color: @old-blue;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: .basis(3)[];
    margin-bottom: .basis(2)[];
    justify-self: stretch;
    grid-area: header;
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
