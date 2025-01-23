<template>
  <div class="tillage-selector dropdown">
    <template v-if="$store.getters['program/data'].type == 'soil-based'">
      <app-sel
        :value="value"
        @input="$emit('input', $event)"
        :label="$ml.get(`Fertigation`)"
        :items="variantsForSoil"
        :info-tip="$ml.get(`Select the option if you add fertilizer to your irrigation water. Note: Quantitative is based on number of applications, but Proportional  is based on the volume of irrigation provided`)"
      >
        <template v-slot="{ items }">
          <app-sel-opt v-for="item in items" :value="item" :key="item.key">
            {{ item.label }}
          </app-sel-opt>
        </template>
      </app-sel>
    </template>
    <template v-else>
      <app-sel
        :value="value"
        @input="$emit('input', $event)"
        :label="$ml.get(`Fertigation`)"
        :items="variantsForHydro"
        :info-tip="$ml.get(`Select the option if you add fertilizer to your irrigation water. Note: Quantitative is based on number of applications, but Proportional  is based on the volume of irrigation provided`)"
      >
        <template v-slot="{ items }">
          <app-sel-opt v-for="item in items" :value="item" :key="item.key">
            {{ item.label }}
          </app-sel-opt>
        </template>
      </app-sel>
    </template>

  </div>
</template>

<script>
export default {
  props: {
    value: {
      required: false
    }
  },
  data() {
    return {
      variantsForSoil: [
        {
          key: 0,
          label: this.$ml.get(`No Fertigation`),
        },
        {
          key: 'quantitative',
          label: this.$ml.get(`Quantitative Fertigation`),
        },
        {
          key: 'proportional',
          label: this.$ml.get(`Proportional Fertigation`),
        }
      ],
      variantsForHydro: [
        // {
        //   key: 0,
        //   label: 'No',
        // },
        {
          key: 'proportional',
          label: this.$ml.get(`Proportional Fertigation`),
        }
      ],
    }
  },
  // created() {
  //   if(this.$store.getters['program/data'].type == 'hydroponic') {
  //     this.value = 'proportional';
  //   }
  // }
}

</script>

<style lang="css" scoped>
</style>
