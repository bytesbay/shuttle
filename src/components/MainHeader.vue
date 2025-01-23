<template>
  <div class="main-header">
    <div class="logo-wrapper">
      <transition name="fade-scale">
        <MainLogo v-if="show"/>
      </transition>
    </div>
    <MenuBtn/>
  </div>
</template>

<script>
import MainLogo from "./MainLogo";
import MenuBtn from "./MenuBtn";

export default {
  components: {
    MainLogo,
    MenuBtn,
  },
  data() {
    return {
      show: false,
    }
  },
  methods: {


    onScroll() {
      let k = this.getScroll().map(0, this.scroll_el.scrollHeight - document.body.clientHeight, 0, 1);

      if(k > 0.1) {
        this.show = true;
      } else {
        this.show = false;
      }
    },

    getScroll() {
      return this.scroll_el.scrollTop;
    },
  },
  mounted() {
    this.scroll_el = document.querySelector('#scroll_elem');
    this.scroll_el.addEventListener('scroll', this.onScroll);
    this.onScroll();
  },
  destroyed() {
    this.scroll_el.removeEventListener('scroll', this.onScroll);
  }
}
</script>

<style lang="scss" scoped>

.main-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  // background: #fff;

  padding: 20px 30px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  svg {
    height: 50px;
    width: auto;
  }
}

</style>