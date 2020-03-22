<template>
  <Loading
    v-if="!loaded"
  />
  <div v-else
    class="bus"
    ref="bus"
    :style="ratioStyles">
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
</template>

<script>
import { mapActions, mapState, mapGetters, mapMutations } from 'vuex'
import Room from './room.vue'
import Loading from './loading.vue'
import { isIOSDevice } from 'ios-detector'

export default {
  name: 'bus',

  components: {
    Room,
    Loading,
  },

  data() {
    return {
      loaded: false,
      ratioStyles: null,
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
    try {
      await this.refreshControllers(true)
    } catch (error) {
      this.showError(error)
      return
    }

    console.log('loaded')
    this.loaded = true

    if (isIOSDevice()) {
      console.log('IOS detected; falling back to JS ratio management.')
      this.$nextTick(() => {
        const width = this.$refs.bus.clientWidth
        this.ratioStyles = `height: ${width * 8 / 40}px;`
      })
    }
  },

  methods: {

    roomState(room) {
      const id = this.nameToIdMap[room]
      return this.controllers[id].state
    },

    toggleController(room) {
      const id = this.nameToIdMap[room]
      this.tellController({ id, toggle: 1 })
    },

    ...mapMutations(['setControllerState']),

    ...mapActions([
      'showError',
      'tellController',
      'refreshControllers',
    ]),
  },
}
</script>

<style lang="less" scoped>
@import '../styles/mixins.less';

.bus {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 80vh;
  width: calc(80vh * 8 / 40);
  background-color: @white;
  border-radius: .basis(2)[];
  border: 4px solid @blue;
  overflow: hidden;
}

.books {
  height: 6%;
}

.bed {
  height: 12%;
}

.bath {
  height: 20%;
}

.kitchen {
  height: 28%;
}

.living {
  flex-grow: 1;
}

</style>
