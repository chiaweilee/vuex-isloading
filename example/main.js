import Vue from 'vue'
import Vuex from 'vuex'
import use from 'vue-use'
import App from './App.vue'
import isloading, { next, is } from '../src'

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
          getters: {
            $is: is
          },
          actions: {
            test7 () {
              next.apply(this, arguments)
            },
            test1 () {
              next.apply(this, arguments)
            },
            test3 ({ dispatch }, payload) {
              dispatch('testX')
              dispatch('testXS')
              next.apply(this, arguments)
            },
            test6 () {
              setTimeout(() => {
                next.apply(this, arguments)
              }, 2000)
            },
            testX ({ state }, payload) {
              next.apply(this, arguments)
            },
            testXS ({ state }, payload) {
              setTimeout(() => {
                next.apply(this, arguments)
              }, 3000)
            }
          }
        },
        b: {
          state: {
            bb: 'bb'
          },
          actions: {
            test2 () {
              next.apply(this, arguments)
            },
            test4 () {
              setTimeout(() => {
                next.apply(this, arguments)
              }, 1000)
            },
            test5 () {
              setTimeout(() => {
                next.apply(this, arguments)
              }, 1000)
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
