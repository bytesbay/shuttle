<template lang="html">
  <div class="app-modal">
    <div class="wrapper">
      <slot/>
    </div>
    <button class="close" @click="close">
      <div class="icon">
        <svg width="14" height="14" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M14 1.4L12.6 0L7 5.6L1.4 0L0 1.4L5.6 7L0 12.6L1.4 14L7 8.4L12.6 14L14 12.6L8.4 7L14 1.4Z"/>
        </svg>
      </div>
      <div class="text">
        Close
      </div>
    </button>
  </div>
</template>

<script>
export default {
  methods: {

    close() {
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scoped>

.app-modal {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: #000;
  overflow: auto;
  // z-index: 200;

  .wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-top: 100px;

    width: 100%;
    height: 100%;
    color: #fff;
  }

  .close {
    height: 50px;
    background: transparent;
    border: 0;
    appearance: none;
    position: absolute;
    right: 30px;
    top: 20px;
    padding: 0;
    background: #fff;
    padding-left: 20px;
    cursor: pointer;

    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    justify-content: center;

    .icon {

      width: 50px;

      display: flex;
      align-items: center;
      justify-content: center;

      svg {
        fill: #000;
      }
    }

    .text {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      color: #000;

      font-family: 'Fira Mono';
      font-size: 14px;
    }
  }
}

</style>
