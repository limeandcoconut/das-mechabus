<template>
  <div class="bus">
    <div class="container">
      <Room
      class="books"/>
      <Room
      class="bed"/>
      <Room
      class="bath"/>
      <Room
      class="kitchen"
      @click.native="() => toggleController('kitchen')"/>
      <Room
      class="living"/>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Room from './room.vue'
import { controllers } from '../../config/config'

export default {
  name: 'bus',

  components: {
    Room,
  },

  methods: {
    toggleController(room) {
      this.postController(controllers[room])
    },

    ...mapActions(['showError', 'postController']),
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
