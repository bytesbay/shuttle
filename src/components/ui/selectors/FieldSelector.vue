<template>
  <div class="field-selector dropdown">
    <app-sel 
      v-model="field" 
      filterable 
      :label="'Field Name'"
      :items="variants"
      is-object
    >
      <template v-slot="{ items }">
        <app-sel-opt v-for="item in items" :value="item" :key="item.key">
          {{ item.label }}
        </app-sel-opt>
      </template>
    </app-sel>
  </div>
</template>

<script>
export default {
  props : {
    farmId : {
      required : true
    },
    value : {
      required : false
    }
  },
  data() {
    return {
      field : {},
      variants : null,
    }
  },
  created() {

    this.$store.dispatch('farms/updateData').then(res => {
      this.variants = this.$store.getters['farms/getFieldsForSelector'](this.farmId);
      if(this.value != null && this.value) {
        this.field = this.variants.find(n => n.value === this.value);
      }
    });
  },
  watch : {
    field: {
       handler(val){
         if (val.value) {
           this.$emit('input',val.value);
         }
       },
       deep: true
    },
    farmId() {

      this.$store.dispatch('farms/updateData').then(res => {
        this.variants = this.$store.getters['farms/getFieldsForSelector'](this.farmId);
        // if(this.value != null && this.value) {
        //   this.field = this.variants.find(n => n.value === this.value);
        // }
      });
    }

  },
}
</script>

<style lang="css" scoped>
</style>
