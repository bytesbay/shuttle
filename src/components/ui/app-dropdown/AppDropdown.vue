<template>
  <div class="app-dropdown" v-click-outside="close">
    <button @click="toggle" class="btn h-empty-btn h-btn">
      <slot/>
    </button>
    <transition name="drop-it-down">
      <div class="drop" v-if="opened">
        <slot name="drop"/>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      opened: false,
    }
  },
  methods: {

    close() {
      this.opened = false;
    },


    toggle() {
      this.opened = !this.opened;
    }
  }
}
</script>

<style lang="scss" scoped>

.app-dropdown {
  position: relative;

  .btn {
    padding: 0 5px;
    height: 20px;    
  }

  .drop {

    position: absolute;
    top: 100%;
    right: 0;
    min-width: 100px;
    background: #fff;
    box-shadow: 0px 4px 12px rgba(133, 133, 133, 0.25);
    border-radius: 5px;
    z-index: 1;

    &.drop-it-down {
      &-enter {
        transform: scale(0.9);
        opacity: 0;
      }
      &-enter-to {
        transform: scale(1);
        opacity: 1;
      }
      &-leave {
        transform: scale(1);
        opacity: 1;
      }
      &-leave-to {
        transform: scale(0.9);
        opacity: 0;
      }
      &-leave-active,
      &-enter-active {
        transition: transform 0.2s ease, opacity 0.2s ease;
      }
    }
  }
}

</style>