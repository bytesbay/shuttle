<template>
  <div class="app-modal-filled">
    <div class="--heading">
      <button class="h-btn h-empty-btn close" @click="close">
        <svg width="10" height="10" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4.99793 4L7.79119 1.20674C7.92376 1.0744 7.99833 0.894828 7.99849 0.707514C7.99866 0.520201 7.92441 0.340493 7.79207 0.207926C7.65974 0.0753579 7.48016 0.000789271 7.29285 0.000623849C7.10554 0.000458426 6.92583 0.0747098 6.79326 0.207043L4 3.00031L1.20674 0.207043C1.07417 0.0744758 0.894369 0 0.70689 0C0.519412 0 0.339611 0.0744758 0.207043 0.207043C0.0744758 0.339611 0 0.519412 0 0.70689C0 0.894369 0.0744758 1.07417 0.207043 1.20674L3.00031 4L0.207043 6.79326C0.0744758 6.92583 0 7.10563 0 7.29311C0 7.48059 0.0744758 7.66039 0.207043 7.79296C0.339611 7.92552 0.519412 8 0.70689 8C0.894369 8 1.07417 7.92552 1.20674 7.79296L4 4.99969L6.79326 7.79296C6.92583 7.92552 7.10563 8 7.29311 8C7.48059 8 7.66039 7.92552 7.79296 7.79296C7.92552 7.66039 8 7.48059 8 7.29311C8 7.10563 7.92552 6.92583 7.79296 6.79326L4.99793 4Z" fill="white"/>
        </svg>
      </button>
    </div>
    <div class="--content">
      <slot/>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    close() {
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scoped>

.app-modal-filled {
  background: #7EAD4C;
  border-radius: 5px;
  box-shadow: 0 0 30px rgba($color: #000000, $alpha: 0.4);

  display: flex;
  flex-direction: column;
  align-items: stretch;

  .--heading {
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    justify-content: space-between;

    padding: 0 16px;
    line-height: 20px;
    vertical-align: middle;
    height: 40px;

    .close {
      width: 20px;
      height: 20px;
      cursor: pointer;
      transition: background .3s ease;
      border-radius: 50%;

      &:hover {
        background: rgba($color: #fff, $alpha: 0.3);
      }
    }
  }

  .--content {
    padding: 20px;

    display: flex;
    flex-direction: column;
    align-items: stretch;
  }
}

</style>
