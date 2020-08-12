<template>
  <div class="ma-4">{{getResult}}</div>
</template>


<script>
export default {
  name: 'result',

  computed: {
    getResult() {
      return this.$store.getters.fetchResult
    },
  },
}
</script>


<style lang="scss" scoped>
</style>