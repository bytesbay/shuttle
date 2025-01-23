<template>
  <div class="date-selector dropdown" :class="{'not-valid': required && notValid}">
    <label>
      <span v-if="label">{{ label }}</span>
      <span v-else>{{ $ml.get(`Planting Date / Bud break (for perennials)`) }}</span>
    </label>
    <date-picker
      :value="value"
      @input="$emit('input', $event)"
      @change="onChange($event)"
      valueType="format"
      :first-day-of-week="1"
      :lang="langs[langName] ? langs[langName] : langs['English']"
      :format="'DD/MM/YYYY'"
      :editable="false"
    >
    </date-picker>
  </div>
</template>

<script>
import DatePicker from 'vue2-datepicker'
import { mapGetters } from 'vuex';

export default {
  components: { DatePicker },
  props: {
    value: {
      required: false
    },
    label: {
      required: false,
    },
    required : {
      required: false,
      default: false,
    },
  },
  data() {
    return {
      notValid : this.value ? false : true,
      // custom lang
      langs: {
        English: {
          days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
          months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          pickers: ['next 7 days', 'next 30 days', 'previous 7 days', 'previous 30 days'],
          placeholder: {
            date: this.$ml.get(`Select Date`),
            dateRange: 'Select Date Range'
          }
        },
        Spanish: {
          days: ["Dom","Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
          months: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
          pickers: ['next 7 days', 'next 30 days', 'previous 7 days', 'previous 30 days'],
          placeholder: {
            date: this.$ml.get(`Select Date`),
            dateRange: 'Select Date Range'
          }
        },
        Japanese: {
          days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
          months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          pickers: ['next 7 days', 'next 30 days', 'previous 7 days', 'previous 30 days'],
          placeholder: {
            date: this.$ml.get(`Select Date`),
            dateRange: 'Select Date Range'
          }
        },
      },
      timePickerOptions:{
        start: '00:00',
        step: '00:30',
        end: '23:30'
      }
    }
  },
  methods : {
    onChange(e) {
      console.log(e);
      if(e) {
        this.notValid = false;
      }else {
        this.notValid = true;
      }

    }
  },
  computed: {
    ...mapGetters({
      langName: 'user/langName',
    }),
  }
}

</script>

<style lang="scss" scoped>
.date-selector {
  position: relative;
  label {
    span {
      font-size:12px;
      text-transform: capitalize;
      opacity: 1;
      color: #4C5056;
      transition: .3s;
      position: absolute;
      top: -17px;
    }
  }
  &::v-deep {
    .mx-datepicker {
      width: 100%;
      cursor: pointer;
      .mx-input {
        padding: 8px 12px 8px 12px;
        border: 1px solid #7EAD4C;
        height: 42px;
        box-shadow: none;
        border-radius: 3px;
        color: #7EAD4C;
        font-size: 16px;

        &::placeholder {
          text-transform: capitalize;
          font-size:16px;
          opacity: .65;
          color:#333;
        }
      }
      .mx-calendar-icon {
        color: #fff;
        font-weight: 600;
      }
      .mx-input-icon {
        color: #fff;
      }
      .mx-input-append {
        background-color: #7EAD4C;
        border-radius: 3px;
      }
      .mx-datepicker-popup {
        width: 100%;
        display: flex;
        justify-content: center;
      }
    }
  }
  &.not-valid {
    &::v-deep {
      .mx-datepicker {
        .mx-input {
          border-color: red;
        }
        .mx-input-append {
          background-color: red;
        }
      }
    }
  }
}
body[dir="rtl"] {
  .date-selector {
    &::v-deep {
      .mx-input-append {
        left: 0;
        right: unset;
      }
      .mx-icon-next-month, .mx-icon-next-year {
        float: left;
      }
      .mx-icon-last-month, .mx-icon-last-year {
        float: right;
      }
    }
  }
}
</style>
