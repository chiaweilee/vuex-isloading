<template>
  <div>
    loading
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
      dispatch('test0')
      dispatch('test1')
      dispatch('test2')
      dispatch('test3')
      dispatch('test4')
      dispatch('test5')
      dispatch('test6')
      this.$store.commit('testM')
    }
  }
}
</script>
