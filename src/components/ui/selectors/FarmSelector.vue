<template>
  <div class="farm-selector dropdown">
    <app-sel
      :value="value"
      @input="onInput"
      filterable
      :label="$ml.get(`Farm name`)"
      @getSearchValue="getSearchValue"
      key-name="id"
      label-name="name"
      :items="$store.getters['farms/farms']"
    >
      <template v-slot="{ items }">
        <app-sel-opt v-for="item in items" :value="item" :key="item.key">
          {{ item.name }}
        </app-sel-opt>
      </template>
    </app-sel>
  </div>
</template>

<script>
export default {
  props : {
    value : {
      required : false,
      default : null,
    }
  },
  methods : {
    onInput(val) {
      this.$emit('input', val);
    },
    getSearchValue(search) {
      this.$emit('userDefinedFarmName',search);
    }
  },
}
</script>

<style lang="scss" scoped>



</style>
