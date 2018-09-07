const hacker = '__x_is_loading_type__'
const setter = '__x_is_loading_setter__'
const stateName = '__x_loading__'

const next = function (arg) {
  if (arg.hasOwnProperty('callee')) {
    if (!!arg[1] && arg[1].hasOwnProperty(hacker)) {
      arg = arg[1][hacker]
    } else {
      arg = null
    }
  } else if (arg.hasOwnProperty(hacker)) {
    arg = arg[hacker]
  } else {
    arg = null
  }
  console.log(arg)
}

export default function (store) {
  const { _vm, state, commit, dispatch, _mutations, strict } = store
  const $set = _vm.$set
  // refactor dispatch
  store.dispatch = function (type, payload) {
    // *** refactor payload
    if (!payload) {
      // payload undefined
      payload = { [hacker]: type }
    } else if (typeof payload === 'object' && !(payload instanceof Array)) {
      // payload object(not array)
      payload[hacker] = type
    }
    dispatch.call(this, type, payload)
  }
  store.subscribeAction(function ({type, payload}) {
    // issue
    // The refactor of dispatch is only on $store.dispatch
    // It does not work for the argument {dispatch} inside a dispatch/commit
    // So the payload might not been refactored
    // is-loading did not work
    if (!payload || typeof payload !== 'object' || payload instanceof Array || !payload.hasOwnProperty(hacker)) return
    // *** cache loading
    if (strict) {
      // strict mode(dev mode)
      if (!_mutations[setter]) {
        $set(_mutations, setter, [
          function (type) { // wrapperMutationHandler
            if (!state[stateName]) $set(state, stateName, {})
            $set(state[stateName], type, true)
          }
        ])
      }
      commit(setter, type)
    } else {
      // prod mode
      if (!state[stateName]) $set(state, stateName, {})
      $set(state[stateName], type, true)
    }
    console.log(`++++++++++ subscribe ${type} ++++++++++`)
  })
}

export {
  next
}
