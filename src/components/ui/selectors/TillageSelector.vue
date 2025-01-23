<template>
  <div class="tillage-selector dropdown">
    
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  props : {
    value : {
      required : false
    }
  },
  data() {
    return {

    }
  },
  created() {
    this.$store.dispatch('program/getTillageValues');
  },
  computed: {
    ...mapGetters({
      tillage: 'program/tillageValues',
    }),
  },
  watch: {

  },


}

</script>

<style lang="scss" scoped>
</style>
