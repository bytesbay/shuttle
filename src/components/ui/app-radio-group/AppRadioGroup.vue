<template>
  <div class="app-radio-group">
    <SelectorOverlayContainer
      :value="value"
      :react-on="items"
      horizontal
    >
      <SelectorOverlayItem
        v-for="item in items"
        :key="item[keyName]"
      >
        <div @click="select(item)" class="item" :class="{ 'selected': item[keyName] === value }">
          {{ item[labelName] }}
        </div>
      </SelectorOverlayItem>
    </SelectorOverlayContainer>
  </div>
</template>

<script>

import {
  SelectorOverlayContainer,
  SelectorOverlayItem
} from '@/components/common/selector-overlay'

export default {
  props: {
    items: {},
    value: {},
    labelName: {
      default: 'label',
    },
    keyName: {
      default: 'key',
    }
  },
  methods: {


    select(item) {
      this.$emit('input', item[this.keyName]);
    }
  },
  components: {
    SelectorOverlayContainer,
    SelectorOverlayItem,
  },
  computed: {
    selected() {
      return this.items.find(n => n[this.labelKey] === value);
    }
  }
}

</script>

<style lang="scss" scoped>

.app-radio-group {

  background: #f7f7f7;
  // border: 1px solid #E4E5E6;
  border-radius: 5px;
  // padding: 3px;

  .item {

    height: 30px;
    padding: 0 20px;
    transition: color 0.3s ease;
    cursor: pointer;
    text-transform: uppercase;
    font-weight: bold;
    color: #666;
    user-select: none;
    display: flex;
    align-items: center;
    justify-content: center;

    &.selected {
      color: #fff;
    }
  }
}

</style>
