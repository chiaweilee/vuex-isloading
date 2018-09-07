<template>
  <div>
    <div>Any loading: {{ $store.getters.$is.anyLoading() }}</div>
    <template v-for="i in 7">
      <div :key="i">Test {{ i }}: {{ $store.getters.$is.loading(`test${i}`) }}</div>
    </template>
    <div>Loadings: {{ $store.getters.$is.loadings() }}</div>
  </div>
</template>

<script>
export default {
  mounted () {
    this.test()
  },
  methods: {
    test () {
      const dispatch = this.$store.dispatch
      dispatch('test1')
      dispatch('test2')
      dispatch('test3')
      dispatch('test4')
      dispatch('test5')
      dispatch('test6')
      dispatch('test7')
    }
  }
}
</script>
