<template>
  <div 
    class="app-modal-default" 
    :class="{
      'styling-error': styling === 'error',
      'styling-warning': styling === 'warning',
      'styling-default': styling === 'default',
    }"
  >
    <div 
      class="--heading" 
    >
      <h2>
        <slot name="header"></slot>
      </h2>
      <button class="h-btn h-empty-btn close" @click="close">
        <svg width="141" height="142" viewBox="0 0 141 142" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="14.2852" y="0.642822" width="179" height="20" transform="rotate(45 14.2852 0.642822)" fill="#C4C4C4"/>
          <rect width="179" height="20" transform="matrix(-0.707107 0.707107 0.707107 0.707107 126.572 1)" fill="#C4C4C4"/>
        </svg>
      </button>
    </div>
    <div class="--content">
      <slot name="content"></slot>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  
  props: {
    unpadded: {
      type: Boolean,
      default: false,
    },
    styling: {
      default: 'default'
    }
  },

  methods: {
    close() {
      this.$emit('close');
    }
  }
}
</script>

<style lang="scss" scoped>

.app-modal-default {

  min-width: 95vw;
  min-height: 95vh;

  // border-radius: 5px;
  // box-shadow: 0 0 30px rgba($color: #000000, $alpha: 0.2);
  display: flex;
  flex-direction: column;
  position: relative;

  .--heading {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0 16px;
    line-height: 20px;
    vertical-align: middle;
    color: #fff;
    // border-top-left-radius: 5px;
    // border-top-right-radius: 5px;
    height: 40px;
    position: relative;

    h2 {
      text-transform: uppercase;
      margin: 0;
      font-size: 16px;
    }

    .close {
      width: 50px;
      height: 100%;
      cursor: pointer;
      transition: background .3s ease;
      // border-radius: 50%;
      border: 0;
      background: transparent;
      appearance: none;
      position: absolute;
      right: 0;
      top: 0;

      display: flex;
      align-items: center;
      justify-content: center;

      svg {
        width: auto;
        height: 15px;
      }

      &:hover {
        background: rgba($color: #fff, $alpha: 0.3);
      }
    }
  }

  .--content {
    background-color: #000;
    // border-bottom-right-radius: 5px;
    // border-bottom-left-radius: 5px;
    padding: 16px;
    flex-grow: 1;
    // border: 2px solid #FF2A75;
    border-top: 0;
  }

  &.styling-default {
    .--heading {
      // background-color: #FF2A75;
    }
  }

  &.styling-error {
    .--heading {
      // background-color: #E8282F;
    }
  }

  &.styling-warning {
    .--heading {
      // background-color: #F2994A;
    }
  }
}

</style>
