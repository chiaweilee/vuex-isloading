'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = function (store) {
  var _vm = store._vm,
      state = store.state,
      commit = store.commit,
      dispatch = store.dispatch,
      _mutations = store._mutations,
      strict = store.strict;

  if (!$set) $set = _vm.$set;
  if (!$delete) $delete = _vm.$delete;
  // register getter
  // x
  // refactor dispatch
  // eslint-disable-next-line
  store.dispatch = function (type, payload) {
    // *** refactor payload
    if (!payload) {
      // payload undefined
      payload = _defineProperty({}, hacker, type);
    } else if ((typeof payload === 'undefined' ? 'undefined' : _typeof(payload)) === 'object' && !(payload instanceof Array)) {
      // payload object(not array)
      payload[hacker] = type;
    }
    dispatch.call(this, type, payload);
  };
  // subscribe
  store.subscribeAction(function (_ref) {
    var type = _ref.type,
        payload = _ref.payload;

    // issue
    // The refactor of dispatch is only on $store.dispatch
    // It does not work for the argument {dispatch} inside a dispatch/commit
    // So the payload might not been refactored
    // is-loading did not work
    if (!payload || (typeof payload === 'undefined' ? 'undefined' : _typeof(payload)) !== 'object' || payload instanceof Array || !payload.hasOwnProperty(hacker)) {
      return;
    }
    // *** cache loading
    if (strict) {
      strictMode = true;
      // strict mode(dev mode)
      if (!mutations) mutations = _mutations;
      if (!_mutations[setter]) {
        $set(_mutations, setter, [function (type) {
          // wrapperMutationHandler
          if (!state[stateName]) $set(state, stateName, {});
          $set(state[stateName], type, true);
        }]);
      }
      commit(setter, type);
    } else {
      // prod mode
      if (!state[stateName]) $set(state, stateName, {});
      $set(state[stateName], type, true);
    }
  });
};

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var hacker = '__x_is_loading_type__';
var deleter = '__x_is_loading_deleter__';
var setter = '__x_is_loading_setter__';
var stateName = '__x_loading__';
var strictMode = false;
var $set = void 0,
    $delete = void 0,
    mutations = void 0;

var next = function next() {
  var _arguments = Array.prototype.slice.call(arguments),
      store = _arguments[0],
      payload = _arguments[1];

  var commit = store.commit,
      rootState = store.rootState;

  if (!!payload && payload.hasOwnProperty(hacker)) {
    var state = rootState[stateName];
    var type = payload[hacker];
    if (strictMode) {
      if (!mutations[deleter]) {
        $set(mutations, deleter, [function (type) {
          $delete(state, type);
        }]);
      }
      commit(deleter, type);
    } else {
      $delete(state, type);
    }
  }
};

var is = function is() {
  var _loading = arguments[2][stateName];
  return {
    loadings: function loadings() {
      return !!_loading && Object.keys(_loading);
    },
    loading: function loading(name) {
      return !!_loading && !!name && (name instanceof Array ? !function () {
        return name.every(function (n) {
          return !_loading[n];
        });
      }() : !!_loading && !!_loading[name]);
    },
    anyLoading: function anyLoading() {
      return !!_loading && Object.keys(_loading).length > 0;
    }
  };
};

exports.next = next;
exports.is = is;