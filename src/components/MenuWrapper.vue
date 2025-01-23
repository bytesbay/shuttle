<template>
  <transition name="fade">
    <div v-if="$root.show_menu" class="menu-wrapper">
      <transition-group 
        @enter="onEnter" 
        :css="false"
        appear
        class="items"
        tag="div"
      >
        <button 
          key="techs" 
          data-index="0" 
          @click="goTo(0.3)" 
          class="item"
        >
          <span data-text="Technologies"></span>
        </button>
        <button 
          key="portfolio" 
          data-index="1" 
          @click="goTo(0.82)" 
          class="item"
        >
          <span data-text="Portfolio"></span>
        </button>
        <button 
          key="contact" 
          data-index="2" 
          @click="goTo(1)" 
          class="item"
        >
          <span data-text="Contact us"></span>
        </button>
      </transition-group>
    </div>
  </transition>
</template>

<script>
import Typewriter from 'typewriter-effect/dist/core';
export default {
  methods: {
    goTo(n) {

      const scroll_elem = document.querySelector('#scroll_elem');

      const scroll = (scroll_elem.scrollHeight - document.body.clientHeight) * n;

      scroll_elem.scroll(0, scroll);
      this.$root.show_menu = false;
    },

    onEnter(el, done) {
      const delay = el.dataset.index * 300
      setTimeout(() => {
        const tw = new Typewriter(el.childNodes[0], {
          strings: el.childNodes[0].dataset.text,
          autoStart: true,
          cursor: null,
          delay: 30,
        });
        tw.callFunction(done).start();
      }, delay)
    }
  }
}
</script>

<style lang="scss" scoped>

.menu-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #000;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .items {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    width: 100%;
    max-width: 300px;
    padding-left: 30px;
  }

  .item {
    padding: 0;
    color: #fff;
    background: transparent;
    border: 0;
    appearance: none;
    font-size: 24px;
    padding: 20px 0;
    font-family: 'Open Sans';
    font-weight: bold;
    height: 60px;
    cursor: pointer;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
}

</style>