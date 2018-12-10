# Vuex-IsLoading

[![Greenkeeper badge](https://badges.greenkeeper.io/chiaweilee/vuex-isloading.svg)](https://greenkeeper.io/)

---

## Install

```
npm install vuex-isloading
```

## Usage

* use isLoading in Vuex's plugins

```ecmascript 6
import Vuex from 'vuex'
import isloading, { next, is } from '../src'

const router = new Vuex({
  ...
  plugins: [
    isloading
  ]
})
```

* add $is into getters
```ecmascript 6
import isloading, { next, is } from '../src'
const store = {
  state: {},
  getters: {
    $is: is
  }
}
```

* callback in actions

```ecmascript 6
import isloading, { next, is } from '../src'
const store = {
  state: {},
  actions: {
    testES6 () {
      $http.get('www.github.com')
        .then(() => {
          next.apply(this, arguments)
        })
    },
    testES5 () {
      const _this = this
      const _arg = arguments
      $http.get('www.github.com')
        .then(function () {
          next.apply(_this, _arg)
        })
    }
  }
}
```

### get loading status

* is any loading

```
{{ $store.getters.$is.anyLoading() }}
```

* is xxx loading

```
{{ $store.getters.$is.loading('testES5') }}
{{ $store.getters.$is.loading(['testES5', 'testES6']) }}
```

* all loadings name

```
{{ $store.getters.$is.loadings() }}
```
