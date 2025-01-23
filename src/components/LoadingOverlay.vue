<template lang="html">
  <transition name="lockdown">
    <div class="loading-overlay" v-if="show">
      <div class="abs">
        <div class="text">
          Launching<span :style="{ opacity: n < dots ? 1 : 0 }" v-for="n in 3">.</span>
        </div>
        <div class="stripe">
          <div v-for="i in cells" class="cell"></div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    loading: {
      type: Boolean,
    }
  },
  data() {
    return {
      show: this.loading,
      cells: 0,
      time: 500,
      dots: 3,
    }
  },
  watch: {
    'loading': function (to) {
      if(to === true) {
        this.show = true;
      } else {
        this.time = 50;
      }
    }
  },
  methods: {
    onTick() {
      this.cells++;

      if(this.cells <= 7) {
        setTimeout(this.onTick, this.time);
      } else {
        if(!this.loading) {
          this.show = false;
        } else {
          this.cells = 1;
          setTimeout(this.onTick, this.time);
        }
      }
    },
  },
  mounted() {
    setTimeout(this.onTick, 500);
    this.dots_interval = setInterval(() => {
      this.dots++;
      if(this.dots > 3) {
        this.dots = 0
      }
    }, 200);
  },
  destroyed() {
    clearInterval(this.dots_interval)
  }
}
</script>

<style lang="scss" scoped>

.loading-overlay {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #000;
  z-index: 100;
  overflow: hidden;

  display: flex;
  align-items: center;
  justify-content: center;

  user-select: none;

  .abs {
    display: flex;
    flex-direction: column;
    align-content: center; 
  
    width: 186px;
    transition: opacity 0.1s ease;

    .stripe {
      width: 100%;
      height: 26px;
      border: 3px solid #FF2A75;

      display: flex;
      flex-direction: row;
      align-items: stretch;

      .cell {
        width: 20px;
        height: 10px;
        margin: 5px 0;
        margin-left: 5px;
        background: #FF2A75;
      }
    }

    .text {
      padding-bottom: 15px;
      font-size: 18px;
      text-align: center;
      color: #FF2A75;
      font-family: 'pixel';
    }
  }

  &.lockdown-leave-active {
    transition: transform 0.5s ease, background 0.2s ease;
  }
  &.lockdown-leave-to {
    transform: scaleY(0);
    background: #fff;

    .abs {
      opacity: 0;
    }
  }
}

</style>
