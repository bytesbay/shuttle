<template>
  <div
    class="v-check app-checkbox"
    @click="changeValue"
    :class="{
      'is-active': value,
      'disabled': disabled == true,
      'size-default': size === 'default',
      'size-small': size === 'small',
    }"
  >
    <div class="empty-space"></div>
    <label>
      <div ref="box" :class="{ checked: value }" class="box">
        <svg viewBox="0 0 50 50">
          <path d="M5 30 L 20 45 L 45 10"></path>
        </svg>
      </div>
      <span>
        {{ label }}
      </span>
    </label>
    <info-tip v-if="infoTip" :title="infoTip" :position="'right'" />
  </div>
</template>

<script>
export default {
  props: {
    label: {
      required: true
    },
    value: {
      required: false,
      default: false
    },
    infoTip: {
      required: false,
      default: false,
    },
    disabled: {
      required: false,
      default: false,
    },
    size: {
      default: 'default',
    }
  },
  methods: {
    changeValue() {

      if(!this.value) {
        let el = this.$refs.box;
        let wave = document.createElement('div');
        wave.classList.add('wave');

        el.appendChild(wave);
        setTimeout(() => {
          wave.remove();
        }, 290);
      }

      this.$emit('input', !this.value)
    }
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
    animation: waving 0.3s ease;
    background: #7EAD4C;
    border-radius: 50%;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 200%;
    height: 200%;
  }
}


.v-check {
  color: #8B8D91;
  display: flex;
  flex-direction: row;
  align-items: center;
  label {
    // text-transform: capitalize;
    user-select: none;
    padding: 4px 0 4px 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    cursor: pointer;
    height: 40px;
    span {
      padding-left: 8px;
      font-size:18px;
      position: relative;
      // line-height: 23px;
    }
    i {
      font-size: 22px;
    }
    input {
      display: none;
    }

  }
  .empty-space {
    // padding: 10px 0 7px 0;
  }
  &.is-active {
    color: #7EAD4C;
  }
  &.disabled {
    color: #e0e0e0;
    pointer-events: none;
    label {
      pointer-events: none;
      .box {
        border-color: #e0e0e0;
        &.checked {
          background-color: #e0e0e0;
        }
        svg path {
          // fill: #e0e0e0;
        }
      }
    }
  }

  &.size-default {

  }

  &.size-small {
    span {
      font-size: 14px;
    }
  }

  .box {

    width: 20px;
    height: 20px;
    border: 1px solid #7EAD4C;
    padding: 3px;
    border-radius: 4px;
    transition: background 0.2s ease;
    position: relative;

    display: flex;
    align-items: center;
    justify-content: center;

    &.checked {
      background: #7EAD4C;
      svg path {
        stroke-dashoffset: 0;
      }
    }

    svg {
      width: 100%;
      height: 100%;
      pointer-events: none;

      path {
        fill: none;
        stroke: #fff;
        stroke-width: 6px;
        stroke-linecap: round;
        stroke-linejoin: round;
        stroke-dasharray: 100;
        stroke-dashoffset: 101;
        transition: all 400ms cubic-bezier(1,0,.37,.91);
      }
    }
  }
}
body[dir="rtl"] {
  .v-check {
    label {
      span {
        padding-right: 8px;
        padding-left: 0;
      }
    }
  }
}
</style>
