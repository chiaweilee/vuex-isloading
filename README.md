## Vue-Fadezero
---

### Install

```
npm install vue-fadezero
```

### Usage
```vuejs
import Vue from 'vue'
import vueFadeZero from 'vue-fadezero'
Vue.use(vueFadeZero, {
  name: 'fadezero', // default: fadezero (v-fadezero)
   tag: 'b', // default: span
   opacity: 0.25, // default: 0.5
   color: [100, 0, 0] // [0, 0, 0]
})
```

```vue
<div v-fadezero="'0.123456789000000000'"/>
```
