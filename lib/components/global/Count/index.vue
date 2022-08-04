<!--
 * @Author: Hikari
 * @Date: 2020-04-01 13:17:24
 * @LastEditTime: 2021-04-01 13:27:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /nuxt-framework/lib/components/Count/index.vue
-->
<template>
  <count-to
    ref="count"
    :start-val="_startVal"
    :end-val="_endVal"
    :duration="_duration"
    :decimals="_decimals"
    :separator="_separator"
    :prefix="_prefix"
    :suffix="_suffix"
    :autoplay="false"
    class="count-to"
  />
</template>
<script>
export default {
  data() {
    return {};
  },
  props: {
    setStartVal: 0,
    setEndVal: 2017,
    setDuration: 4000,
    setDecimals: 0,
    setSeparator: ",",
    setSuffix: " rmb",
    setPrefix: "¥ ",
  },

  computed: {
    _startVal() {
      if (this.setStartVal) {
        return this.setStartVal;
      } else {
        return 0;
      }
    },
    _endVal() {
      if (this.setEndVal) {
        return this.setEndVal;
      } else {
        return 0;
      }
    },
    _duration() {
      if (this.setDuration) {
        return this.setDuration;
      } else {
        return 100;
      }
    },
    _decimals() {
      if (this.setDecimals) {
        if (this.setDecimals < 0 || this.setDecimals > 20) {
          return 0;
        }
        return this.setDecimals;
      } else {
        return 0;
      }
    },
    _separator() {
      return this.setSeparator;
    },
    _suffix() {
      return this.setSuffix;
    },
    _prefix() {
      return this.setPrefix;
    },
  },

  methods: {
    start() {
      this.$refs.count.start();
    },

    pauseResume() {
      this.$refs.count.this.$refs.example.pauseResume();
    },
  },
};
</script>
<style lang="scss" scoped>
</style>