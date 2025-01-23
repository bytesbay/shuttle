<template>
  <div
    class="app-loading"
    :class="{
      'size-default': size === 'default',
      'size-big': size === 'big',
    }"
  >
    <LoadingSVG
      :style="{ 'top': pos }"
      v-if="loading && !refreshFlag"
    />
    <app-btn v-if="loading && refreshFlag" @click="refresh()">
      Refresh
    </app-btn>
    <slot v-if="!loading"/>
  </div>
</template>

<script>
import LoadingSVG from './LoadingSVG';

export default {
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    // 50%, 40px
    pos: {
      default: '50%',
    },
    size: {
      default: 'default',
    },
    isTimeOut: {
      type: Boolean,
      default: false,
    },
    timeOut: {
      type: Number,
      default: 5000
    }
  },
  components: {
    LoadingSVG,
  },
  created () {
    if (this.loading) {
      this.checkRefresh();
    }
  },
  data () {
    return {
      loadTimeout: '',
      refreshFlag: false
    }
  },
  methods: {
    refresh () {
      this.refreshFlag = false;
      this.$emit('refresh');
    },
    checkRefresh () {
      if (this.isTimeOut) {
        if (this.loading) {
          this.loadTimeout = setTimeout(() => {
            this.refreshFlag = true;
          }, this.timeOut);
        } else {
          clearTimeout(this.loadTimeout);
        }
      }
    }
  },
  watch: {
    loading: function (val) {
      this.checkRefresh();
    }
  }
}
</script>

<style lang="scss" scoped>

.app-loading {
  width: 100%;
  height: 100%;
  position: relative;
  min-height: 40px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;

  .loading-svg {
    position: absolute;
    left: 50%;
    fill: #333;
    top: 50%;
    max-height: 100vh;

  }

  &.size-default {
    .loading-svg {
      width: 20px;
      height: 20px;
      margin-left: -10px;
      margin-top: -10px;
    }
  }

  &.size-big {
    .loading-svg {
      width: 40px;
      height: 40px;
      margin-left: -20px;
      margin-top: -20px;
    }
  }
}

</style>
