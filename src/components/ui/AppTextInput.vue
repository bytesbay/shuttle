<template>
  <!-- <div
    class="text-input app-text-input"
    :class="{
      'active': isActiveLabel,
      'styling-default': styling === 'default',
      'styling-inline-inverse': styling === 'inline-inverse',
      'disabled': disabled,
      'not-valid': required && !validateVal
    }"
    :ref="groupLabel"
  > -->
  <div
    class="text-input app-text-input"
    :class="{
      'active': isActiveLabel,
      'styling-default': styling === 'default',
      'styling-inline-inverse': styling === 'inline-inverse',
      'styling-inline': styling === 'inline',
      'disabled': disabled,
      /* 'not-valid': required && !validateVal */
      /* 'not-valid': required && !validateVal */
    }"
    :ref="groupLabel"
  >
    <input-label :active="isActiveLabel">
      {{ label }}
      <!-- {{ required ? '(*)' : '(optional)' }} -->
    </input-label>
    <div v-if="hint" class="hint">
      {{ isUnit ? $store.getters['unit/getLabel'](hint) : hint}}
    </div>
    <div v-if="infoTip" class="tip-container">
      <info-tip size="18" :title="infoTip" :position="'right'"/>
    </div>

    <input
      :type="type"
      :value="get_value()"
      :placeholder="placeholder"
      :autocomplete="autocomplete"
      :required="!!required"
      :maxlength="maxlength"
      :minlength="minlength"
      :min="min"
      :step="step"
      :max="max"
      :disabled="disabled"
      @blur="onInput"
      @focus="onFocus"
      :onkeypress="onkeypress"
    />
  </div>
</template>

<script>
import InputLabel from './InputLabel';

export default {
  name: 'text-input',
  components: {
    InputLabel,
  },
  props: {
    step: {
      required: false,
      default: 'any'
    },
    onkeypress: {
      required: false,
      default: 'return event.keyCode != 13;'
    },
    digitsAfterDot: {
      required: false,
      default: 5,
      type: Number,
    },
    value: {
      required: true,
      default: ''
    },
    infoTip: {
      required: false,
      default: false,
    },
    label: {

    },
    placeholder: {

    },
    autocomplete: {
      type: String,
      default: 'new-password',
    },
    maxlength: {

    },
    minlength: {

    },
    type: {
      default: 'text'
    },
    hint: {

    },
    min: {},
    max: {},
    disabled: {
      required: false,
      default: false,
    },
    styling: {
      default: 'default'
    },
    required: {
      type: Boolean,
      default: false
    },
    errorMsg: '',
    validate: {
      type: Boolean,
      default: false
    },
    group: {
      type: Number,
      defalt: 2674937
    },
  },
  data() {
    return {
      focused: false,
      validateVal: false,
      groupLabel: 'appTextInput_' + this.group
    }
  },
  created () {
    // console.log(this.$vnode.key);
    // console.log(this.$parent.$children);
    // console.log(this.$parent.$children.$refs);

    if (this.required && this.value && this.value != '') {
      this.validateVal = true;
    }
  },
  computed: {
    isActiveLabel() {
      const is_valid = this.value !== null;
      return (is_valid && this.value.toString().length || this.focused)
        ? true
        : false;
    },
    isUnit () {
      if (this.hint && this.$store.getters['unit/isUnit'](this.hint))
        return true;

      return false;
    }
  },
  methods: {
    onInput(e) {
      let val = e.target.value;

      if (this.required && val != '') {
        if (this.type !== 'number' && this.minlength && this.minlength > val.length) {
          this.validateVal = false;
        } else if (this.type !== 'number' && this.maxlength && this.maxlength < val.length) {
          this.validateVal = false;
        } else {
          this.validateVal = true;
        }
      } else {
        this.validateVal = false;
      }

      if(this.type === 'number') {
        const min = parseFloat(this.min);
        const max = parseFloat(this.max);

        val = +val;

        val = val.toFixed(this.digitsAfterDot);

        if(this.min && (min > Number(val) && Number(val))) {
          val = min;
        }
        else if(this.max && (max < Number(val) && Number(val))) {
          val = max;
        }

        var item;
        for (var el of this.$el.children) {
          if (el.constructor.name == 'HTMLInputElement') {
            item = el;
          }
        }

        var val_new = val;
        val = Number(val) ? Number(val) : (this.min ? min : 0);

        item.value = val_new;
      }

      if (this.isUnit)
        val = this.$store.getters['unit/unConvert'](this.hint, val);

      this.onBlur(val);
      // console.log(val);

      return this.$emit('input', val);
    },
    onBlur(val) {
      this.focused = false;
      this.$emit('blur', val);
    },
    onFocus(val) {
      this.focused = true;
      this.$emit('focus', val);
    },

    getValidate: function () {
      return this.validateVal;
    },
    get_value: function () {
      var val = this.value;
      if (this.isUnit && val > 0)
        val = this.$store.getters['unit/convert'](this.hint, val);

      return val;
    }
  },
  watch: {
    validate: function (val) {
      if (this.errorMsg && this.required && !this.validateVal) {
        this.$notify({
          group: 'notices',
          title: this.errorMsg,
          type : 'error',
        });
      }
      if (this.$vnode.key == 0 && this.required) {
        let flag = 0;
        for (let item of this.$parent.$children) {
          if (item.$refs[this.groupLabel] && !item.getValidate()) {
            flag++;
          }
        }

        if (flag === 0) {
          this.$emit('validateEnv', true);
        } else {
          this.$emit('validateEnv', false);
        }
      }
    },
  },
}
</script>

<style lang="scss" scoped>

.app-text-input {
  width:100%;
  font-size: 14px;
  height: 42px;
  position: relative;

  .hint {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    line-height: 0;
    font-size: 14px;
    pointer-events: none;
  }

  input {

    width: 100%;
    height: 100%;
    padding: 0 12px;
    outline: none;
    font-size: 16px;

    /* Chrome, Safari, Edge, Opera */
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    /* Firefox */
    &[type=number] {
      -moz-appearance: textfield;
    }

    &::placeholder {
      text-transform: capitalize;
      font-size:18px;
      opacity: .65;
      color:#333;
    }


  }

  .tip-container {
    position: absolute;
    right: 5px;
    bottom: calc(100% + -10px);
  }


  &.styling-default {

    input {
      border: 1px solid #e0e0e0;
      border-radius: 3px;
      border-style: solid;
      background-color: #fff;
      color: #7EAD4C;
      box-shadow: 0 0 0 transparent;
      transition: box-shadow 0.3s ease, border-color 0.3s ease;

      &:focus {
        border-color: #7EAD4C;
        box-shadow: 0 2px 10px rgba($color: #7EAD4C, $alpha: 0.4);
      }
    }

    &.disabled {
      input {
        color: #999;
        background-color: #e0e0e0;
      }
    }

    &.active {
      .hint {
        color: #7EAD4C;
      }
    }
  }


  &.styling-inline-inverse {
    padding: 0 5px;
    border-bottom: 1px solid rgba(#fff, 0.3);

    input {
      border: 0;
      color: #fff;
      background: transparent;
      padding: 0;
    }

    .input-label {
      color: #eee;
    }
  }

  &.styling-inline {
    padding: 0 5px;
    border-bottom: 1px solid #8B8D91;

    input {
      border: 0;
      color: #8B8D91;
      background: transparent;
      padding: 0;
    }

    // .input-label {
    //   color: #eee;
    // }
  }

  &.disabled {
    border-color: #999;
    input {
      color: #999;
      border-color: #e0e0e0;
    }
  }
}

.not-valid {
  input {
    border: solid 1px red !important;

    &:focus {
      box-shadow: 0 2px 10px rgba($color: red, $alpha: 0.4) !important;
    }
  }
  .input-label {
    color: red;
  }
}

body[dir="rtl"] {
  .app-text-input {
    .hint {
      right: unset;
      left: 10px;
    }
    .tip-container {
      right: unset;
      left: 5px;
    }
  }
}
</style>
