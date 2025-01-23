<template>
  <div 
    class="toggler-w"
  >
    <button
      class="toggler menu cross menu--1"
      @click="toggle"
      ref="btn"
      :class="{
        toggled: $root.show_menu
      }"
    >
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <path class="line--1" d="M0 40h62c13 0 6 28-4 18L35 35" />
        <path class="line--2" d="M0 50h70" />
        <path class="line--3" d="M0 60h62c13 0 6-28-4-18L35 65" />
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  props: {

  },
  methods:{
    hand(e) {
      let el = this.$refs['btn'];
      let wave = document.createElement('div');
      wave.classList.add('wave');

      el.appendChild(wave);
      setTimeout(() => {
        wave.remove();
      }, 450);
    },
    toggle() {
      this.$root.show_menu = !this.$root.show_menu
    },
  },
  mounted() {
    let el = this.$refs['btn'];

    if(!this.$is_mobile) {
      el.addEventListener('mousedown', this.hand)
    } else {
      el.addEventListener('touchstart', this.hand)
    }
  },
  created() {
    
  },
};
</script>

<style lang="scss" scoped>

@keyframes waving {
  0% {
    transform: translate(-50%, -50%) scale(0);
    opacity: 1;
  }
  100% {
    transform: translate(-50%, -50%) scale(1.5);
    opacity: 0;
  }
}

::v-deep {
  .wave {
    animation: waving 0.5s ease;
    // background: rgba($color: #6FCD97, $alpha: 0.8);
    // box-shadow: 0px 6px 25px #6FCD97;
    // border-radius: 100%;
    border: 2px solid #FF2A75;
    top: 50%;
    left: 50%;
    width: 50px;
    height: 50px;
    border-radius: 50%;

    position: absolute;
  }
}

.toggler {
  color: #fff;
  height: 50px;
  right: 0;
  width: 50px;
  padding: 0;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 100%;
}

svg {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 200%;
  height: 200%;
  pointer-events: none;
}

path {
  fill: none;
  stroke: #ffffff;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  --length: 24;
  --offset: -38;
  stroke-dasharray: var(--length) var(--total-length);
  stroke-dashoffset: var(--offset);
  transition: all .3s cubic-bezier(.645, .045, .355, 1);
}

.toggler {
  border: 0;
  background: transparent;
  appearance: none;
}

circle {
  fill: #fff3;
  opacity: 0;
}

.menu--1 {
  .line--1,
  .line--3 {
    --total-length: 126.64183044433594;
  }
  .line--2 {
    --total-length: 70;
  }
}

.toggler {
  &.toggled {
    svg {
      .line--1,
      .line--3 {
        --offset: -94.1149185097;
      }
      .line--2 {
        --offset: -50;
      }
    }

    path {
      stroke: #FF2A75;
    }

    &.cross svg {
      .line--1,
      .line--3 {
        --length: 22.627416998;
      }
      .line--2 {
        --length: 0;
      }
    }
  }
}

</style>
