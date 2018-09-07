const hacker = '__x_is_loading_type__'
const deleter = '__x_is_loading_deleter__'
const setter = '__x_is_loading_setter__'
const stateName = '__x_loading__'
let strictMode = false
let $set, $delete, mutations

const next = function () {
  const [ store, payload ] = arguments
  const { commit, rootState } = store
  if (!!payload && payload.hasOwnProperty(hacker)) {
    const state = rootState[stateName]
    const type = payload[hacker]
    if (strictMode) {
      if (!mutations[deleter]) {
        $set(mutations, deleter, [
          function (type) {
            $delete(state, type)
          }
        ])
      }
      commit(deleter, type)
    } else {
      $delete(state, type)
    }
  }
}

const is = function () {
  const loading = arguments[2][stateName]
  return {
    loadings: () => !!loading && Object.keys(loading),
    loading: name => !!loading && !!name && (name instanceof Array ? !(() => name.every(n => !loading[n]))() : (!!loading && !!loading[name])),
    anyLoading: () => !!loading && Object.keys(loading).length > 0
  }
}

export default function (store) {
  const {_vm, state, commit, dispatch, _mutations, strict} = store
  if (!$set) $set = _vm.$set
  if (!$delete) $delete = _vm.$delete
  // register getter
  // x
  // refactor dispatch
  // eslint-disable-next-line
  store.dispatch = function (type, payload) {
    // *** refactor payload
    if (!payload) {
      // payload undefined
      payload = {[hacker]: type}
    } else if (typeof payload === 'object' && !(payload instanceof Array)) {
      // payload object(not array)
      payload[hacker] = type
    }
    dispatch.call(this, type, payload)
  }
  // subscribe
  store.subscribeAction(function ({type, payload}) {
    // issue
    // The refactor of dispatch is only on $store.dispatch
    // It does not work for the argument {dispatch} inside a dispatch/commit
    // So the payload might not been refactored
    // is-loading did not work
    if (!payload || typeof payload !== 'object' || payload instanceof Array || !payload.hasOwnProperty(hacker)) {
      return
    }
    // *** cache loading
    if (strict) {
      strictMode = true
      // strict mode(dev mode)
      if (!mutations) mutations = _mutations
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
  })
}

export {
  next,
  is
}
