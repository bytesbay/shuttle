<template>
  <div
    v-click-outside="closeDropdown"
    @click="toggleDropdown"
    class="app-sel h-roboto"
    :class="{
      'dropped': opened,
      'styling-inline': styling === 'inline',
      'no-border': border === 'no-border',
      'default': styling === 'default',
      'disabled': disabled,
      /* 'not-valid': this.selectedItem == undefined */
    }"

  >
    <div class="item">

      <input-label v-if="label" :active="labelActive" :styling="inputLabelStyling" :hide-top-label="hideTopLabel">
        {{ label }}
        <!-- <info-tip v-if="infoTip" :title="infoTip" /> -->
      </input-label>
      <div class="input">
        <transition name="fade">
          <div v-if="!filterable" class="text h-no-sel">
            {{ formText }}
          </div>
        </transition>

        <input
          v-if="filterable"
          :value="search_enabled ? search : formText"
          type="text"
          class="h-empty-input"
          @focus="onFocus"
          @blur="onBlur"
          @input="onInputSearch"
          autocomplete="off"
          tabindex="-1"
        >

        <button tabindex="-1" :class="{ expanded: opened }" class="expand-btn h-btn h-empty-btn" @focus="!opened ? toggleDropdown : ''">
          <svg width="10" height="6" viewBox="0 0 6 5" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.86794 0.954378L3.40366 4.0521C3.16989 4.33549 2.8095 4.33549 2.58548 4.0521L0.12119 0.954378C-0.112577 0.661218 0.00430651 0.436462 0.364696 0.436462H5.62444C5.99457 0.436462 6.10171 0.661218 5.86794 0.954378Z" fill="#7EAD4C"/>
          </svg>
        </button>
      </div>
    </div>
    <transition name="cool">
      <div v-if="opened" class="dropdown" :class="{ 'to-top': to_top }">
        <div class="scroller">
          <slot :items="processedItems"/>
        </div>
      </div>
    </transition>


    <div v-if="infoTip" class="tip-container">
      <info-tip size="18" :title="infoTip" :position="'right'"/>
    </div>

    <input
      class="if-required"
      v-if="required"
      required="required"
      type="text"
      :value="selectedItem ? selectedItem[keyName] : ''"
      :data-key="keyName"
    >
  </div>
</template>

<script>
import InputLabel from '../InputLabel'

export default {
  components: {
    InputLabel,
  },
  props: {
    hideTopLabel: {
      required: false,
      type: Boolean,
      default: false,
    },
    infoTip: {
      required: false,
      default: false,
    },
    label: {
      type: String
    },
    value: {
      required: true,
    },
    keyName: {
      type: String,
      default: 'key',
    },
    labelName: {
      type: String,
      default: 'label',
    },
    items: {

    },
    isObject: {
      type: Boolean,
      default: false,
    },
    // placeholder : {
    //   type : String,
    //   default : '',
    // },
    filterable: {
      type: Boolean,
      default: false,
    },
    styling: {
      default: 'default',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    border: {
      default: 'border'
    },
    required: {
      type: Boolean,
      default: false
    },
  },
  watch: {
    selectedItem: function (to, from) {
      if(to) {
        this.search = to[this.labelName];
      } else {
        this.search = '';
      }
    },
    focused: function (to, from) {

    },
  },
  data() {
    return {
      opened: false,
      search: this.value && this.value[this.labelName] ? this.value[this.labelName] : '',
      search_enabled: false,
      focused: false,
      to_top: false,
    }
  },
  methods: {
    onFocus() {
      this.focused = true;
    },
    toggleDropdown(e) {

      if(!this.opened) {
        var rect = this.$el.getBoundingClientRect();

        // 150px is max-height
        const viewport = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
        if(rect.top > (viewport - 150)) {
          this.to_top = true;
        }

      } else {
        this.to_top = false;
      }

      this.opened = !this.opened;
    },
    closeDropdown(e) {
      this.opened = false;
    },
    onSelect(item) {
      this.search = item[this.labelName];

      if(this.isSingleValued) {
        this.$emit('input', item[this.keyName]);
      } else {
        this.$emit('input', item);
      }

      if(this.filterable) {
        this.search_enabled = false;
      }
    },
    _isObject(val) {
      return val == null || typeof val != 'object'
    },
    onBlur() {
      this.focused = false;
      if(!this.search || !this.search.length) {
        this.search_enabled = false;
      }
    },
    onInputSearch(e) {
      this.search_enabled = true;
      this.search = e.target.value;
      this.$emit('getSearchValue', this.search);
    },
  },
  computed: {

    inputLabelStyling() {
      return this.styling === 'inline' ? 'on-board' : 'default';
    },

    isSingleValued() {
      return !this.isObject ? true : false;
    },

    processedItems() {
      const filter_enabled =
        this.filterable &&
        this.search_enabled;

      if(!filter_enabled) {
        return this.items;
      } else {
        return this.items
          .filter(n => {
            return n && n[this.keyName] !== undefined;
          })
          .filter(n => {

            const is_searched = new RegExp(this.search.trim(), 'i')
              .test(n[this.labelName])

            return !this.search.length
              || (!filter_enabled || (filter_enabled && is_searched));
          });
      }
    },

    selectedItem() {

      if(
        this.value !== null &&
        typeof this.value !== 'undefined' &&
        this.items &&
        this.items.length
      ) {
        const item = this.items.find(n => {
          if(this.isSingleValued) {
            return n[this.keyName] == this.value;
          } else {
            return n[this.keyName] == this.value[this.keyName];
          }
        });

        return item;
      }
    },

    formText() {
      return this.selectedItem ? this.selectedItem[this.labelName] : '';
    },

    labelActive() {
      return ( (this.selectedItem && this.label && this.label.length != undefined)
        || this.focused
        || this.search.length
      ) ? true : false
    },
  },
  mounted() {

  },
  created() {

  }
}
</script>

<style lang="scss" scoped>

$border_width: 1px;

.app-sel {
  cursor: pointer;
  position: relative;
  border: $border_width solid #e0e0e0;
  border-radius: 3px;
  height: 42px;
  min-width: 150px;
  padding: 8px 32px 8px 12px;
  box-shadow: 0 0 0 transparent;
  transition: box-shadow 0.3s ease, border-color 0.3s ease;

  &.dropped {
    border-color: #7EAD4C;
    box-shadow: 0 2px 10px rgba($color: #7EAD4C, $alpha: 0.4);
  }

  .item {
    height: 100%;

    .input {
      width: 100%;
      height: 100%;

      display: flex;
      flex-direction: row;
      align-items: center;

      .text {
        color: #7EAD4C;
        font-size: 16px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }

      input {
        width: 100%;
        height: 100%;
        // padding: 4px 0 8px 0;
        font-size: 16px;
        color: #7EAD4C;
        cursor:pointer;
        &::placeholder {
          text-transform: capitalize;
          font-size:18px;
          opacity: .65;
          color:#333;
        }
      }

      .expand-btn {
        pointer-events: none;
        display: flex;
        align-items: center;
        justify-content: center;
        display: -webkit-box;
        position: absolute;
        right: -1px;
        top: -1px;
        width: 30px;
        height: calc(100% + 2px);
        // border-radius: 3px;
        // border: 1px solid #e0e0e0;
        box-sizing: border-box;
        border-bottom-right-radius: 3px;
        border-top-right-radius: 3px;
        // transform: translateY(-50%);
        // transition: transform 0.3s ease;
        svg {
          transition: transform 0.3s ease;
        }
        &.expanded {
          // transform: translateY(-50%) rotate(180deg);
          border-color: #7EAD4C;

          svg {
            transform: rotate(180deg);
          }
        }

      }
    }
  }

  .dropdown {
    position: absolute;
    top: calc(100% - 3px);
    left: 50%;
    overflow: auto;
    width: calc(100% - 4px);
    max-height: 150px;
    // z-index: 401;
    z-index: 1;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    min-width: 150px;
    transform: translateX(-50%);
    background: white;
    &.to-top {
      top: unset;
      bottom: 100%;
      top: auto !important;
    }

    .scroller {
      display: flex;
      flex-direction: column;
      align-items: stretch;
    }

    &.cool {
      &-enter {
        transform: translateY(10px) translateX(-50%);
        opacity: 0;
      }
      &-enter-to {
        transform: translateY(0) translateX(-50%);
        opacity: 1;
      }
      &-leave {
        transform: translateY(0) translateX(-50%);
        opacity: 1;
      }
      &-leave-to {
        transform: translateY(10px) translateX(-50%);
        opacity: 0;
      }
      &-leave-active,
      &-enter-active {
        transition: transform 0.2s ease, opacity 0.2s ease;
      }
    }
  }

  &.default {
    .expand-btn {
      background-color: #7EAD4C;
      svg {
        path {
          fill: #fff;
        }
      }
    }
    .dropdown {
      border-radius: 3px;
    }

    &:focus {
      // box-shadow: 0 2px 10px rgba($color: #7EAD4C, $alpha: 0.4);
    }
  }

  &.styling-inline {

    border: 1px solid #7EAD4C;
    width: 80px;
    min-width: 80px;
    height: 42px;
    margin-left: 4px;
    .input {
      .text {
        color: #7EAD4C;
      }
    }

    .dropdown {
      top: calc(100% - 5px);
      border-radius: 5px;
    }
  }

  &.no-border {
    border: none !important;
    margin-left: 0 !important;
  }

  &.dropped {
    // border-radius: 3px 3px 0 0;
  }

  &.disabled {
    pointer-events: none;
    border-color: #BEBEBE;
    .expand-btn {
      background: #BEBEBE;
    }
  }

  &.not-valid {
    border-color: red;
    .expand-btn {
      background: red;
    }
  }

  .tip-container {
    position: absolute;
    right: 5px;
    bottom: calc(100% + 5px);
  }
  .if-required {
    height: 0px;
    width: 100%;
    opacity: 0;
  }
}

body[dir="rtl"] {
  .app-sel {
    .item {
      .input {
        .expand-btn {
          right: unset;
          left: -1px;
        }
      }
    }
    .tip-container {
      right: unset;
      left: 5px;
    }
  }
}

</style>
