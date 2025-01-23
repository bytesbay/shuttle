<template>
  <div class="app-dropdown-item" @click="onClick">
    <div class="icon" v-if="icon">
      <span class="material-icons">
        {{ icon }}
      </span>
    </div>
    <slot/>
  </div>
</template>

<script>
export default {
  props: {
    icon: {

    }
  },
  methods: {
    onClick() {
      this.$parent.close();
      this.$emit('click');
    }
  }
}
</script>

<style lang="scss" scoped>

.app-dropdown-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

  border-top: 1px solid #E4E5E6;
  padding: 10px 15px;
  color: #7EAD4C;
  font-size: 14px;
  user-select: none;
  font-weight: normal;
  cursor: pointer;

  &:first-child {
    border-top: 0;
    border-radius: 5px 5px 0 0;
  }

  &:last-child {
    border-radius: 0 0 5px 5px;
  }

  &:hover {
    background: rgba(#7EAD4C, 0.2);
  }

  .icon {
    width: 24px;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    span {
      font-size: 16px;
    }
  }
}

</style>