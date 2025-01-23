<template>
  <div class="text-input" :class="{ active: isActiveLabel }">
    <div class="label-wrapper">
      <input-label :active="isActiveLabel">
        {{ label }}
      </input-label>
    </div>
    <div v-if="hint" class="hint">
      {{ hint }}
    </div>
    <textarea
      :rows="rows"
      :type="type"
      :value="value"
      @input="$emit('input', $event.target.value)"
      :placeholder="placeholder"
      :autocomplete="autocomplete"
      :required="required"
      :maxlength="maxlength"
      :minlength="minlength"
      @blur="onBlur"
      @focus="onFocus"
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
    value: {
      required: true,
      default: ''
    },
    label: {

    },
    placeholder: {

    },
    autocomplete: {
      type: Boolean,
      default: false,
    },
    required: {
      type: Boolean,
      default: false,
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
    rows: {
      default: 8,
    }
  },
  data() {
    return {
      focused: false,
    }
  },
  computed: {
    isActiveLabel() {
      const is_valid = this.value !== null;
      return (is_valid && this.value.toString().length || this.focused)
        ? true
        : false;
    }
  },
  methods: {
    onBlur() {
      this.focused = false;
    },
    onFocus() {
      this.focused = true;
    },
  }
}
</script>

<style lang="scss" scoped>

.text-input {

  width:100%;
  font-size: 14px;
  min-height: 40px;
  border: 1px solid #7EAD4C;
  border-radius: 3px;
  position: relative;

  .hint {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translate(-50%);
    line-height: 0;
    font-size: 14px;
  }

  .label-wrapper {
    height: 40px;
    pointer-events: none;
    position: absolute;
    width: 100%;
  }

  textarea {
    resize: none;
    border-radius: 3px;
    width: 100%;
    height: 100%;
    border-width: 0px;
    border-style: solid;
    padding: 12px;
    background-color: #fff;
    outline: none;
    color: #7EAD4C;
    font-size: 16px;
    box-shadow: 0 0 0 transparent;
    transition: box-shadow 0.1s ease;
    min-height: 40px;
    vertical-align: middle;

    &::placeholder {
      text-transform: capitalize;
      font-size:18px;
      opacity: .65;
      color:#333;
    }

    &:focus {
      box-shadow: 0 0 0 4px rgba($color: #7EAD4C, $alpha: 0.2);
    }
  }

  &.active {

    .hint {
      color: #7EAD4C;
    }
  }
}
</style>
