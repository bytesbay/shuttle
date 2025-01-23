<template>
  <div class="scroll-tip">
    <transition name="fade">
      <div class="border" v-if="show">
        <div class="circle"></div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: true,
    }
  },
  methods: {

    onScroll(e) {
      const scroll = this.getScroll();
      if(Math.abs(scroll - this.initial_scroll) > 100) {
        this.show = false;
      }
    },

    getScroll() {
      return this.scroll_el.scrollTop;
    },
  },
  mounted() {
    this.scroll_el = document.querySelector('#scroll_elem');
    this.initial_scroll = this.getScroll();
    this.scroll_el.addEventListener('scroll', this.onScroll)
  },
  destroyed() {
    this.scroll_el.removeEventListener('scroll', this.onScroll)
  },
}
</script>

<style lang="scss" scoped>

.fade {
  &-enter {
    opacity: 0;
  }
  &-enter-to {
    opacity: 1;
  }
  &-leave {
    opacity: 1;
  }
  &-leave-to {
    opacity: 0;
  }
  &-leave-active,
  &-enter-active {
    transition: opacity 0.3s ease;
  }
}

@keyframes anim {
  0% {
    transform: translate(-50%, -130%);
  }
  100% {
    transform: translate(-50%, 30%);
    opacity: 0.5;
  }
}

.scroll-tip {

  position: fixed;
  left: 50%;
  bottom: 15%;
  transform: translate(-50%, -50%);
  
  .border {
    width: 30px;
    height: 60px;
    border: 3px solid #FF2A75;
    border-radius: 9999px;
    // box-shadow: 0 0 10px #FF2A75, 0 0 10px #FF2A75 inset;

    .circle {
      background: #FF2A75;
      border-radius: 100%;
      position: absolute;
      width: 14px;
      height: 14px;
      left: 50%;
      top: 50%;
      // box-shadow: 0 0 10px #FF2A75;
      animation: anim 2s ease infinite;
    }
  }
}

</style>