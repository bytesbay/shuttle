<template>
  <button
    type="button"
    class="app-sel-opt h-empty-btn"
    @click="onClick"
    :class="{ selected: isSelected }"
  >
    <slot/>
  </button>
</template>

<script>
export default {
  props: {
    value: {},
  },

  methods: {
    onClick(e) {
      this.getRootSelect().onSelect(this.value);
      this.$emit('click', e);
    },

    getRootSelect() {
      var parent = this.$parent;
      while(true) {
        if(parent.$options.name == 'app-sel') {
          return parent;
        }
        parent = parent.$parent;
        if(!parent) {
          break;
        }
      }
    }
  },

  mounted() {

  },

  computed: {

    isSingleValued() {
      return (this.getRootSelect().isSingleValued) ? true : false;
    },

    isSelected() {

      const root = this.getRootSelect()

      if(this.isSingleValued) {
        return root.value === this.value[root.keyName]
      } else {
        return root.value[root.keyName] === this.value[root.keyName]
      }
    },
  }
}
</script>

<style lang="scss" scoped>

.app-sel-opt {
  text-align: left;
  font-size: 16px;
  color: #7EAD4C;
  background: #fff;
  border-bottom: 1px solid #e0e0e0;
  padding: 10px 20px;
  transition:
    color 0.3s ease,
    background 0.3s ease,
    border-bottom-color 0.3s ease;

  &.selected {
    color: #fff;
    background: #7EAD4C;
    border-bottom-color: #7EAD4C;
  }
  &:hover {
    color: #fff;
    background: #7EAD4C;
    border-bottom-color: #7EAD4C;
  }
}
body[dir="rtl"] {
  .app-sel-opt {
    text-align: right;
  }
}

</style>
