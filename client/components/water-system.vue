<template>
  <Loading
    v-if="!loaded || spinning"
  />
  <div v-else
    class="water-system">
    <div v-if="(!getController('dump') &&  !getController('fill') && !getController('pump')) || !mode"
      class="error">
      Error: Incoherent State
    </div>

    <RadioInput
      name="mode"
      value="dump"
      :checked="mode === 'dump'"
      class="input"
      @click="setMode('dump')">
      Dump
    </RadioInput>

    <RadioInput
      name="mode"
      value="fill"
      :checked="mode === 'fill'"
      class="input"
      @click="setMode('fill')">
      Fill
    </RadioInput>

    <RadioInput
      name="mode"
      value="pump"
      :checked="mode === 'pump'"
      class="input"
      @click="setMode('pump')">
      Pump
    </RadioInput>

    <RadioInput
      name="mode"
      value="city"
      :checked="mode === 'city'"
      class="input"
      @click="setMode('city')">
      City
    </RadioInput>

  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex'
import Loading from './loading.vue'
import RadioInput from './radio-input.vue'

export default {
  name: 'water-system',

  components: {
    Loading,
    RadioInput,
  },

  data () {
    return {
      loaded: false,
      spinning: false,
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
        !this.controllerState('dump') &&
        !this.controllerState('fill') &&
        !this.controllerState('pump')
      ) {
        return 'city'
      }

      return null
    },

    ...mapState([
      'controllers',
      'nameToIdMap',
      'refreshPromise',
    ]),
  },

  async mounted () {
    await this.refreshPromise
    this.loaded = true
  },

  methods: {
    setMode (mode) {
      this.spinning = true
      setTimeout(() => {
        this.spinning = false
      }, 500)

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
  border: 4px solid @blue;
  overflow: hidden;
  padding-top: .5rem;
  padding-right: .5rem;
  padding-left: .5rem;
  height: 100%;
}

.error {
  background-color: @magenta;
}

.input {
  margin-bottom: 0.25rem;
}

</style>
