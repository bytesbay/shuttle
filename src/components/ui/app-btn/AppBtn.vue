<template>
  <component
    :is="to ? 'router-link' : 'button'"
    :to="to"
    @click="onClick"
    class="btn h-btn app-btn"
    type="button"
    :class="{
      'disabled': disabled,
      'outline': styling === 'outline',
      'styling-inline': styling === 'inline',
      'default': styling === 'default',
      'size-normal': size === 'normal',
      'size-big': size === 'big',
      'loading': loading,
      'danger': danger,
      'danger-outline': styling == 'danger-outline',
    }"
  >
    <div class="content">
      <MatIcon :size="size" :icon="icon" v-if="icon"/>
      <slot/>
      <transition name="fade">
        <LoadingSVG v-if="loading"/>
      </transition>
    </div>
  </component>
</template>

<script>
import LoadingSVG from './../LoadingSVG';
import MatIcon from './MatIcon';

export default {
  name: 'btn',
  props: {
    danger: {
      required: false,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    icon: {

    },
    to: {

    },
    wAuto: {
      type: Boolean,
      default: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    styling: {
      default: 'default'
    },
    size: {
      default: 'normal'
    }
  },
  methods: {
    onClick(e) {

      if(this.loading) {
        return;
      }

      if(this.styling === 'outline' || this.styling === 'inline') {
        let el = this.$el;
        let wave = document.createElement('div');
        wave.classList.add('wave');

        let offset = e.relativeOffsetByEvent(el);
        let rect = el.getBoundingClientRect();

        wave.style.top = offset.y + 'px';
        wave.style.left = offset.x + 'px';
        wave.style.width = rect.width + 'px';
        wave.style.height = rect.width + 'px';

        el.appendChild(wave);
        setTimeout(() => {
          wave.remove();
        }, 490);
      }

      this.$emit('click', e)
    }
  },
  components: {
    LoadingSVG,
    MatIcon,
  }
}
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
    background: #7EAD4C;
    border-radius: 50%;
    position: absolute;
  }
}

.app-btn {
  min-width: 90px;
  height: 32px;
  min-height: 32px;
  border-radius: 5px;
  font-weight: bold;
  font-size: 14px;
  cursor: pointer;
  text-transform: uppercase;
  position: relative;
  overflow: hidden;
  border: 0;

  width: auto;
  white-space: nowrap;
  padding-left: 20px;
  padding-right: 20px;
  min-width: 0;
  appearance: none;

  .content {
    width: 100%;
    height: 100%;
    color: #fff;
    user-select: none;

    display: flex;
    align-items: center;
    justify-content: center;

    .loading-svg {
      width: 14px;
      height: 14px;
      position: absolute;
      right: 6px;
      top: 50%;
      margin-top: -7px;
    }
  }

  &.disabled {
    pointer-events: none;
  }

  &.margin-around {
    margin-right: 8px;
    margin-left: 8px;
  }

  &.size-big {
    padding: 0 20px;
    min-width: 0;
    height: 48px;
    border-radius: 5px;

    .content {
      letter-spacing: 1px;
      font-size: 17px;
    }
  }

  &.default {
    background: #7EAD4C;
    border: 1px solid #7EAD4C;
    transition:
      box-shadow 0.3s ease,
      padding 0.3s ease,
      transform 0.3s ease;

    svg {
      fill: #fff;
    }

    &:hover {
      transform: translateY(-2px);
      box-shadow:
        0px 0 0 rgba(0, 0, 0, 0.2) inset,
        0px 2px 10px rgba(112, 156, 64, 0.795);
    }

    &:active {
      transform: translateY(0);
      box-shadow: none;
      box-shadow:
        0px 0 30px rgba(0, 0, 0, 0.3) inset,
        0px 0 0 transparent;
    }

    &.disabled {
      background: #8B8D91;
      border: 1px solid rgb(124, 126, 129);
    }
  }

  &.danger {
    background-color: #E8282F;
    border-color: #E8282F;
    &:hover {
      box-shadow: 0px 0 0 rgba(0, 0, 0, 0.2) inset, 0px 2px 10px rgba(232, 40, 47, 0.795);
    }
  }
  &.danger-outline {
    background-color: transparent;
    // border-color: #E8282F;
    border: 1px solid #E8282F;
    .content {
      color: #E8282F;
    }
    &:hover {
      box-shadow: 0px 0 0 rgba(0, 0, 0, 0.2) inset, 0px 2px 10px rgba(232, 40, 47, 0.795);
    }
  }

  &.outline {
    transition:
      padding 0.3s ease,
      background 0.3s ease;

    // TESTIRUЮ
    // background: #ffffff;
    background: transparent;
    background: none;

    border:1px solid rgb(111, 156, 64);

    .content {
      color: #7EAD4C;
    }

    svg {
      fill: #7EAD4C;
    }

    &:hover {
      background: rgba($color: rgb(146, 204, 83), $alpha: 0.2);
    }

    &:active {
      transform: translateY(0);
      box-shadow: none;
    }

    &.disabled {
      .content {
        color: #8B8D91;
      }
    }
  }

  /** INLINE */
  &.styling-inline {
    transition:
      padding 0.3s ease,
      background 0.3s ease;

    background: transparent;
    background: none;

    .content {
      color: #7EAD4C;
    }

    svg {
      fill: #7EAD4C;
    }

    &:hover {
      background: rgba($color: rgb(146, 204, 83), $alpha: 0.2);
    }

    &:active {
      transform: translateY(0);
      box-shadow: none;
    }

    &.disabled {
      .content {
        color: #8B8D91;
      }
    }
  }

  &.loading {
    padding-right: 30px;
    padding-left: 10px;
    pointer-events: none;
  }
}

</style>
