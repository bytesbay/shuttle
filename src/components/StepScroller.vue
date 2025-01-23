<template>
  <transition name="fade">
    <div v-show="show" class="step-scroller">
      <div class="curr-step">
        <transition :name="transition" mode="out-in">
          <span 
            v-for="(step, i) in steps" 
            v-if="current_step === i"
            :key="step.name"
          >
            {{ step.name }}
          </span>
        </transition>
      </div>
      <div v-once class="container">
        <div ref="scroller" class="scroller">
          <div class="step" v-for="(step, i) in steps">
            <div 
              v-for="n in 10" 
              :style="{ left: `${n * 10}%` }" 
              v-if="n % 2 === 0"
              class="small dig"
            ></div>
            <div 
              v-for="n in 10" 
              :style="{ left: `${n * 10}%` }"
              v-if="n % 2 !== 0"
              class="mid dig"
            >
              <div class="text">
                {{ (n + (10 * i)) * 10 }}
              </div>
            </div>
            <!-- <div class="big dig"></div> -->
          </div>
        </div>
      </div>
      <svg width="36" height="19" viewBox="0 0 36 19" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1.16244 18.5L18 0.727014L34.8376 18.5H1.16244Z"/>
      </svg>
    </div>
  </transition>
</template>

<script>
import { steps } from './steps.data';

export default {
  data() {
    return {
      show: false,
      steps: [ ...steps ],
      current_step: 0,
      transition: 'fade-move-left',
    }
  },
  methods: {

    onAppearScroll(e) {
      const scroll = this.getScroll();
      if(Math.abs(scroll - this.initial_scroll) > 100) {
        this.show = true;
      }
    },

    scrollTo(index) {
      const step = this.steps[index];

      const max_height = this.scroll_el.scrollHeight - document.body.clientHeight;

      if(index === this.steps.length - 1) {
        var scroll_to = max_height
      } else {
        var scroll_to = (max_height * step.range_from) + 1
      }

      this.scroll_el.scrollTo(0, scroll_to);
    },

    onScroll(e) {

      if(!this.show) {
        return
      }

      clearTimeout(this.timeout)

      const scroll_offset = this.getScroll();
      let k = scroll_offset.map(0, this.scroll_el.scrollHeight - document.body.clientHeight, 0, 1);
      
      // get current step 
      let step = this.steps.find(n => {
        if(k > n.range_from && k <= n.range_to) {
          return n;
        }
      });

      // get current step index
      let stepIndex = this.steps.findIndex(n => {
        if(k > n.range_from && k <= n.range_to) {
          return n;
        }
      });

      if(!step || !stepIndex) {
        step = this.steps[0]
        stepIndex = 0
      }

      // normalize it
      const normalized_k = k.map(step.range_from, step.range_to, 0, 1);

      // 
      const el = this.$refs['scroller']
      const width = 300;
      let offset = (stepIndex * width) + (normalized_k * width)
      const max_scroll = (steps.length - 1) * width;
      if(offset > max_scroll) {
        offset = max_scroll;
      }
      el._offset = offset;

      if(this.current_step > stepIndex) {
        this.transition = 'fade-move-right'
      } 
      else if(this.current_step < stepIndex) {
        this.transition = 'fade-move-left'
      }
      this.current_step = stepIndex;

      const delay = 300;
      if(step.name !== 'Our works') {
        if(normalized_k > 0.5 && this.steps[stepIndex + 1]) {
          this.timeout = setTimeout(() => this.scrollTo(stepIndex + 1), delay);
        }
        else if(normalized_k < 0.05) {
          // DO NOTHING
        }
        else {
          this.timeout = setTimeout(() => this.scrollTo(stepIndex), delay);
        }
      }
    },

    getScroll() {
      return this.scroll_el.scrollTop;
    },

    onAnimation() {
      const el = this.$refs['scroller'];
      el._current_offset += (el._offset - el._current_offset) * 0.05;
      el.style.transform = `translateX(-${el._current_offset}px)`
      requestAnimationFrame(this.onAnimation);
    },
  },
  mounted() {
    this.scroll_el = document.querySelector('#scroll_elem');
    this.initial_scroll = this.getScroll();
    this.scroll_el.addEventListener('scroll', this.onAppearScroll)
    this.scroll_el.addEventListener('scroll', this.onScroll)

    this.$refs['scroller']._current_offset = 0;
    this.$refs['scroller']._offset = 0;
    requestAnimationFrame(this.onAnimation)
  },
  destroyed() {
    this.scroll_el.removeEventListener('scroll', this.onScroll)
    this.scroll_el.removeEventListener('scroll', this.onAppearScroll)
  },
}
</script>

<style lang="scss" scoped>

.step-scroller {
  position: absolute;
  bottom: 15%;
  left: 50%;
  transform: translateX(-50%);
  pointer-events: none;
  // background: #000;
  // padding: 10px;
  // border-radius: 10px;

  .curr-step {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: calc(100% + 10px);
    color: #FF2A75;
    // color: #fff;
    border: 2px solid #FF2A75;
    // background: #FF2A75;
    // font-weight: bold;
    width: 200px;
    height: 30px;
    // font-family: 'Fira Mono', monospace;
    font-family: 'pixel';
    text-transform: uppercase;
    font-size: 16px;
    overflow: hidden;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  svg {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: calc(100%);
    // stroke: #fff;
    // stroke-width: 3px;
    width: 25px;
    height: auto;
    fill: #fafafa;
  }
  
  .container {
    width: 300px;
    height: 40px;
    overflow: hidden;

    .scroller {
      height: 100%;
      width: 1000px;

      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;

      .step {
        height: 100%;
        min-width: 300px;
        border-bottom: 1px solid #fff;
        position: relative;
        // color: #FF2A75;
        color: #fff;
        // font-weight: bold;
        text-transform: uppercase;
        font-family: 'pixel';
        font-size: 14px;

        display: flex;
        flex-direction: row;
        align-items: flex-start;
        justify-content: space-around;

        .dig {

          position: absolute;
          bottom: 0;
          width: 2px;
          background: #fff;
          transform: translateX(-50%);

          &.small {
            height: 5px;
          }
          &.mid {
            height: 10px;
          }
          &.big {
            left: 50%;
            height: 30px;
          }

          .text {
            position: absolute;
            transform: translateX(-50%);
            bottom: calc(100% + 10px);
          }
        }
      }
    }
  }
}

</style>