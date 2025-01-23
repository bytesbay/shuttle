<template>
  <div
    class="input-label h-no-sel"
    :class="{
      'active': active,
      'default': styling === 'default',
      'on-board': styling === 'on-board',
      'hide-on-top': hideTopLabel,
    }"
  >
    <slot/>
  </div>
</template>

<script>
export default {

  props: {
    active: {
      type: Boolean,
      required: true,
    },
    hideTopLabel: {
      required: false,
      default: false,
      type: Boolean,
    },
    styling: {
      default: 'default',
    }
  },

  data() {
    return {

    }
  }

}
</script>

<style lang="scss" scoped>

.input-label {
  font-size: 16px;
  opacity: .65;
  color:#4C5056;
  position: absolute;
  bottom: 50%;
  left: 12px;
  padding-left: 1px;
  transform: translateY(50%);
  pointer-events: none;
  display: flex;
  align-items: center;
  transition:
    transform 0.3s ease,
    bottom 0.3s ease,
    left 0.3s ease,
    opacity 0.3s ease;
  &.active {
    bottom: 100%;
    opacity: 1;
    left: 0;
    transform: translateY(-5px);
    pointer-events: all;
    &.hide-on-top {
      opacity: 0;
    }
  }

  &.on-board {
    &.active {
      background: #fff;
      box-shadow: 0 2px 5px rgba(0,0,0,0.2);
      padding: 2px 4px;
      border-radius: 3px;

    }
  }

  &:hover {
    // pointer-events: none;
  }
}
body[dir="rtl"] {
  .input-label {
    left: unset;
    right:12px;
    padding-left: 0;
    padding-right: 1px;
  }
}

</style>
