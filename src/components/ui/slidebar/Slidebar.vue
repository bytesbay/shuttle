<template>
  <div class="slidebar"
    :class="{
      'low': changableValue == 'Low',
      'adequate': changableValue == 'Adequate',
      'high': changableValue == 'High',
      'excessive': changableValue == 'Excessive',
    }"
  >
    <div class="top" v-if="label || changableValue">
      <p class="label" v-if="label">
        {{ label }}
      </p>
      <p class="selected-value" >
        {{ selectedValueLabel ? $ml.get(selectedValueLabel) : $ml.get(changableValue) }}
        <!-- {{selectedValueLabel}} -->
      </p>
    </div>
    <div class="top" v-else>
      {{ $ml.get('None') }}
    </div>
    <vue-slidebar
      ref="sliderbar"
      @change="changeValue($event)"
      v-model="changableValue"
      v-bind="config"
      :marks="marks"
      :hide-label="hideMarksLabel"
      :tooltip="tooltip"
      :data="data"
    >
    </vue-slidebar>
    <div class="spacer" v-if="marks && !hideMarksLabel"></div>
  </div>
</template>

<script>
export default {
  props: {
    tooltip: {
      required: false,
      default: 'active',
    },
    value: {
      required: true,
    },
    data: {
      required: false,
    },
    min: {
      required: true,
    },
    max: {
      required: true,
    },
    label: {
      required: false,
    },
    selectedValueLabel: {
      required: false,
    },
    marks: {
      required: false,
      default: false,
    },
    hideMarksLabel: {
      required: false,
      default: false,
    }


  },
  data() {
    return {
      changableValue: this.value,
      config: {
        dotSize: 20,
        width: 'auto',
        height: 6,
        contained: false,
        direction: 'ltr',
	      data: null,
        min: this.min ? this.min : 0,
        max: this.max ? this.max : 100,
        interval: 1,
        disabled: false,
        clickable: true,
        duration: 0.5,
        adsorb: false,
        lazy: false,
        tooltip: 'active',
        tooltipPlacement: 'top',
        tooltipFormatter: void 0,
        useKeyboard: false,
        keydownHook: null,
        dragOnClick: false,
        enableCross: true,
        fixed: false,
        minRange: void 0,
        maxRange: void 0,
        order: true,
        dotOptions: void 0,
        process: true,
        dotStyle: void 0,
        railStyle: void 0,
        processStyle: void 0,
        tooltipStyle: void 0,
        stepStyle: void 0,
        stepActiveStyle: void 0,
        labelStyle: void 0,
        labelActiveStyle: void 0,
      }
    }
  },
  methods: {
    changeValue(e) {
      // console.log(e);
      // console.log(this.changableValue);
      this.$emit('input', this.changableValue);
    },
  },
  watch: {
    value: function (val) {
      this.changableValue = val;
    }
  }
}
</script>

<style lang="scss" scoped>
.slidebar {
  width: 100%;


  &.low {
    .selected-value {
      color: #5EC19B;
    }
    .vue-slider::v-deep {

      .vue-slider-process {
        background-color: #5EC19B;
      }
      .vue-slider-dot-handle {
        border-color: #5EC19B;
      }
      .vue-slider-mark-step-active {
        box-shadow: 0 0 0 2px #5EC19B;
      }

    }
  }


  &.adequate {
    .selected-value {
      color: #A7B975;
    }
    .vue-slider::v-deep {

      .vue-slider-process {
        background-color: #A7B975;
      }
      .vue-slider-dot-handle {
        border-color: #A7B975;
      }
      .vue-slider-mark-step-active {
        box-shadow: 0 0 0 2px #A7B975;
      }

    }
  }


  &.high {
    .selected-value {
      color: #F2B14E;
    }
    .vue-slider::v-deep {

      .vue-slider-process {
        background-color:  #F2B14E;
      }
      .vue-slider-dot-handle {
        border-color: #F2B14E;
      }
      .vue-slider-mark-step-active {
        box-shadow: 0 0 0 2px #F2B14E;
      }

    }
  }


  &.excessive {
    .selected-value {
      color: #EC5A60;
    }
    .vue-slider::v-deep {

      .vue-slider-process {
        background-color: #EC5A60;
      }
      .vue-slider-dot-handle {
        border-color: #EC5A60;
      }
      .vue-slider-mark-step-active {
        box-shadow: 0 0 0 2px #EC5A60;
      }

    }
  }

  .top {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 4px;
    p {
      margin: 0;

      &.selected-value {

      }
    }
  }
  .vue-slider {
    cursor: pointer;
    &::v-deep {
      .vue-slider-process {
        background-color: rgb(126, 173, 76);
      }
      .vue-slider-dot-handle {
        border-color: #7EAD4C;
      }
      .vue-slider-mark-step-active {
        box-shadow: 0 0 0 2px rgb(126, 173, 76);
      }
      .vue-slider-mark {
        &:hover {
           .vue-slider-mark-step {
             box-shadow: 0 0 0 2px #7EAD4C;
           }
        }
      }
    }
  }
  .spacer {
    padding: 12px ;
  }

}
</style>
