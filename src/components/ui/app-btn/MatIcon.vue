<template>
  <div 
    class="mat-icon" 
    :class="{
      'size-normal': size === 'normal',
      'size-big': size === 'big',
    }"
  >
    <i class="material-icons">
      {{ icon }}
    </i>
  </div>
</template>

<script>
export default {
  props: {
    icon: {
      required: true,
    },
    size: {
      default: 'normal'
    }
  }
}
</script>

<style lang="scss" scoped>

.mat-icon {
  display: flex;
  align-items: center;
  justify-content: center;

  padding-right: 3px;
  &.size-normal {
    .material-icons {
      font-size: 16px;
    }
  }
  
  &.size-big {
    .material-icons {
      font-size: 20px;
    }
  }
}

</style>