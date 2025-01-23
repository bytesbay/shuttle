<template lang="html">
  <button class="modal-close app-modal-close" type="button" @click="$emit('click', $event)">
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 1.15689L18.8406 0L10 8.82369L1.15941 0L0 1.15689L8.84059 9.98065L0 18.8037L1.15941 19.9606L10 11.1375L18.8406 19.9606L20 18.8037L11.1588 9.98065L20 1.15689Z" :fill="color ? color : '#BDBDBD'"/>
    </svg>
  </button>
</template>

<script>
export default {
  props: {
    color: {
      
    }
  }
}
</script>

<style lang="scss" scoped>

.modal-close {
  position: absolute;
  right: 25px;
  top: 20px;
  width: 20px;
  height: 20px;
  padding: 0;
}

</style>
