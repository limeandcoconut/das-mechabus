<template>
  <Loading
  v-if="!loaded"
  />
  <div v-else
  class="bus">
    <div class="container">
      <Room
      :state="0"
      class="books"/>
      <Room
      :state="0"
      class="bed"/>
      <Room
      :state="0"
      class="bath"/>
      <Room
      class="kitchen"
      :state="roomState('kitchen')"
      @click.native="() => toggleController('kitchen')"/>
      <Room
      :state="0"
      class="living"/>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters, mapMutations } from 'vuex'
import Room from './room.vue'
import Loading from './loading.vue'

export default {
  name: 'bus',

  components: {
    Room,
    Loading,
  },

  data() {
    return {
      loaded: false,
    }
  },

  computed: {
    ...mapState([
      'controllers',
      'nameToIdMap',
    ]),

    ...mapGetters(['initPromise']),
  },

  async mounted() {
    await this.initPromise
    console.log('loaded')
    this.loaded = true
  },

  methods: {

    roomState(room) {
      const id = this.nameToIdMap[room]
      console.log(this.controllers[id].state)
      return this.controllers[id].state
    },

    toggleController(room) {
      const id = this.nameToIdMap[room]
      this.postController({ id, toggle: 1 })
    },

    ...mapMutations(['setControllerState']),

    ...mapActions([
      'showError',
      'postController',
    ]),
  },
}
</script>

<style lang="less" scoped>
@import '../styles/mixins.less';

.bus {
  .ratio(40; 8);
  background-color: white;
  position: relative;
  box-shadow: @dark-grey 25px 25px 1px 8px;
  border-radius: .basis(2)[];
}

.container {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: grid;
  grid-template: auto / [window] 3fr [bedside] 6fr [bath-bed] 8fr [bulkhead] 12fr [counter-end] 16fr [windshield];
  grid-template-areas: "books bed bath kitchen living";
}

.books {
  grid-area: books;
}

.bed {
  grid-area: bed;
}

.bath {
  grid-area: bath;
}

.kitchen {
  grid-area: kitchen;
}

.living {
  grid-area: living;
}

.test {
  width: 100px;
  height: 100px;
  border: 1px solid #000;
}

</style>
