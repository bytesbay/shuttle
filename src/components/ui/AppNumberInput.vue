<template>
  <div
    class="app-number-input text-input"
    :class="{
      'disabled': disabled,
      'readonly': readonly,
    }"
  >
    <button @click.stop="decrement">
      -
    </button>
    <input
      class="h-empty-input h-monrope"
      :value="get_value()"
      :required="required"
      :min="min"
      :max="max"
      :disabled="disabled"
      ref="input"
      type="number"
      step="any"
      :readonly="readonly"
      @blur="onInput"
      @focus="onFocus"
      :style="{
        'minWidth': minWidth,
        }"
    />
    <button @click.stop="increment">
      +
    </button>
  </div>
</template>

<script>
export default {
  components: {

  },
  props: {
    minWidth: {
      required: false,
      default: '50px',
    },
    value: {
      required: true,
      default: null
    },
    placeholder: {

    },
    required: {
      type: Boolean,
      default: false,
    },
    min: {
      type: Number,
    },
    max: {
      type: Number,
    },
    hint: {

    },
    disabled: {
      default: false,
    },
    readonly: {
      default: false,
    },
    step: {
      default: 1
    }
  },
  data() {
    return {
      focused: false,
    }
  },
  computed: {

  },
  methods: {

    setOrigin (val) {
      var item;
      for (var el of this.$el.children) {
        if (el.constructor.name == 'HTMLInputElement') {
          item = el;
        }
      }
      item.value = val;
    },

    increment() {
      var val = parseFloat(this.$refs['input'].value) + this.step;

      if(this.max != undefined && this.max < val) {
        val = this.max;
      }
      this.setOrigin(val);

      if (this.isUnit)
        val = this.$store.getters['unit/unConvert'](this.hint, val);

      this.$emit('input', val);
    },

    decrement() {
      var val = parseFloat(this.$refs['input'].value) - this.step;

      if(this.min != undefined && this.min > val) {
        val = this.min;
      }
      this.setOrigin(val);

      if (this.isUnit)
        val = this.$store.getters['unit/unConvert'](this.hint, val);

      this.$emit('input', val);
    },

    onInput(e) {
      let val = parseFloat(e.target.value);

      if(isNaN(val)) {
        this.$emit('input', null);
        return;
      }

      if(this.min && this.min > val) {
        val = this.min;
      }
      if(this.max && this.max < val) {
        val = this.max;
      }

      this.setOrigin(val);

      if (this.isUnit)
        val = this.$store.getters['unit/unConvert'](this.hint, val);
        
      this.onBlur();

      this.$emit('input', val);
    },
    onBlur() {
      this.focused = false;
    },
    onFocus() {
      this.focused = true;
    },

    get_value: function () {
      var val = this.value;
      if (this.isUnit)
        val = this.$store.getters['unit/convert'](this.hint, val);


      return val;
    }
  },
  computed: {
    isUnit () {
      if (this.hint && this.$store.getters['unit/isUnit'](this.hint))
        return true;

      return false;
    }
  },
}
</script>

<style lang="scss" scoped>

.text-input {
  font-size: 14px;
  height: 36px;
  border-radius: 5px;
  position: relative;

  display: flex;
  flex-direction: row;
  align-items: center;

  // .hint {
  //   position: absolute;
  //   top: 50%;
  //   right: 10px;
  //   transform: translateY(-50%);
  //   line-height: 0;
  //   font-size: 14px;
  //   pointer-events: none;
  // }

  button {

    background: transparent;
    border: 0;
    cursor: pointer;
    padding: 0;
    color: #333;
    width: 20px;
    height: 20px;
    font-size: 18px;
    user-select: none;

    display: flex;
    flex-direction: row;
    align-content: center;
    justify-content: center;

    &.plus {

    }

    &.minus {

    }
  }

  input {
    width: 0;
    flex-grow: 1;
    border-radius: 5px;
    border-width: 0px;
    border-style: solid;
    padding: 0 12px;
    background-color: #fff;
    outline: none;
    color: #7EAD4C;
    font-size: 16px;
    box-shadow: 0 0 0 transparent;
    border: 1px solid #e0e0e0;
    align-self: stretch;
    min-width: 50px;
    text-align: center;

    box-shadow: 0 0 0 transparent;
    transition: box-shadow 0.3s ease, border-color 0.3s ease;

    &:focus {
      border-color: #7EAD4C;
      box-shadow: 0 2px 10px rgba($color: #7EAD4C, $alpha: 0.4);
    }

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
}
</style>
