<template>
  <Loading
    v-if="!loaded"
  />
  <div v-else-if="!getController('dump') &&  !getController('fill') && !getController('pump')"
    class="error">
    Error: Incoherent State
  </div>
  <div v-else
    class="water-system">

    <input type="radio" id="dump" name="mode" value="dump"
      :checked="mode === 'dump'"
      @click="setMode('dump')">
    <label for="dump">Dump</label>
    <input type="radio" id="fill" name="mode" value="fill"
      :checked="mode === 'fill'"
      @click="setMode('fill')">
    <label for="fill">Fill</label>
    <input type="radio" id="pump" name="mode" value="pump"
      :checked="mode === 'pump'"
      @click="setMode('pump')">
    <label for="pump">Pump</label>
    <input type="radio" id="city" name="mode" value="city"
      :checked="mode === 'city'"
      @click="setMode('city')">
    <label for="city">City</label>

  </div>
</template>

<script>
import { mapActions, mapState, mapGetters, mapMutations } from 'vuex'
import Loading from './loading.vue'

export default {
  name: 'water-system',

  components: {
    Loading,
  },

  data () {
    return {
      loaded: false,
    }
  },

  computed: {
    mode () {
      if (
        this.controllerState('dump') &&
      !this.controllerState('fill') &&
      !this.controllerState('pump')
      ) {
        return 'dump'
      } else if (
        !this.controllerState('dump') &&
      this.controllerState('fill') &&
      !this.controllerState('pump')
      ) {
        return 'fill'
      } else if (
        !this.controllerState('dump') &&
      !this.controllerState('fill') &&
      this.controllerState('pump')
      ) {
        return 'pump'
      } else if (
        // If the state is incoherent then default it to 'city'
        !(
          !this.controllerState('dump') &&
          !this.controllerState('fill') &&
          !this.controllerState('pump')
        )
      ) {
      // This might not belong here
        this.setMode('city')
      }
      return 'city'
    },

    ...mapState([
      'controllers',
      'nameToIdMap',
      'refreshPromise',
    ]),

    ...mapGetters(['initPromise']),
  },

  async mounted () {
    await this.refreshPromise
    this.loaded = true
  },

  methods: {
    setMode (mode) {
      this.mode = mode
      if (mode === 'dump') {
        this.setController('dump', 1)
        this.setController('fill', 0)
        this.setController('pump', 0)
        return
      }
      if (mode === 'fill') {
        this.setController('dump', 0)
        this.setController('fill', 1)
        this.setController('pump', 0)
        return
      }
      if (mode === 'pump') {
        this.setController('dump', 0)
        this.setController('fill', 0)
        this.setController('pump', 1)
        return
      }
      if (mode === 'city') {
        this.setController('dump', 0)
        this.setController('fill', 0)
        this.setController('pump', 0)
      }
    },

    getController (name) {
      return this.controllers[this.nameToIdMap[name]]
    },

    controllerState (name) {
      const controller = this.getController(name)
      return controller ? controller.state : 0
    },

    setController (name, state) {
      const id = this.nameToIdMap[name]
      this.tellController({ id, state })
    },

    ...mapMutations([
      'setControllerState',
    ]),

    ...mapActions([
      'showError',
      'tellController',
    ]),
  },
}
</script>

<style lang="less" scoped>
@import '../styles/mixins.less';

.water-system {
  position: relative;
  display: flex;
  flex-direction: column;
  border-radius: .basis(2)[];
  border: 4px solid @blue;
  overflow: hidden;
}

.error {
  background-color: @magenta;
}

</style>
