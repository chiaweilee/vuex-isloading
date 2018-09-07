import Vue from 'vue'
import Vuex from 'vuex'
import use from 'vue-use'
import App from './App.vue'
import isloading, { next } from '../src'

Vue.config.productionTip = false

const { store } = use(Vue, {
  Vuex: {
    Vuex,
    Store: {
      modules: {
        a: {
          state: {
            aa: 'aa'
          },
          mutations: {
            testM () {}
          },
          actions: {
            test0 () {
              next(arguments)
              console.log('---------- test1 done ----------')
            },
            test1 () {
              next(arguments)
              console.log('---------- test1 done ----------')
            },
            test3 ({ dispatch }, payload) {
              dispatch('testX')
              dispatch('testXS')
              next(arguments)
              console.log('---------- test3 done ----------')
            },
            test6 () {
              next(arguments)
              setTimeout(() => console.log('---------- test6 done ----------'), 2000)
            },
            testX ({ state }, payload) {
              next(arguments)
              console.log(payload)
              console.log('---------- testX done ----------')
            },
            testXS ({ state }, payload) {
              next(arguments)
              console.log(payload)
              setTimeout(() => console.log('---------- testXS done ----------'), 3000)
            }
          }
        },
        b: {
          state: {
            bb: 'bb'
          },
          actions: {
            test2 () {
              next(arguments)
              console.log('---------- test2 done ----------')
            },
            test4 () {
              next(arguments)
              setTimeout(() => console.log('---------- test4 done ----------'), 1000)
            },
            test5 () {
              next(arguments)
              setTimeout(() => console.log('---------- test5 done ----------'), 1000)
            }
          }
        }
      },
      strict: process.env.NODE_ENV !== 'production',
      plugins: [isloading]
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  render: h => h(App),
  template: '<App/>',
  components: {App}
})
