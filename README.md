<p align="center">
  <a href="#">
    <img width="150"src="./docs/logo.svg">
  </a>
</p>

<p align="center">Vue.js plugin for route preflight actions.</p>

### API
#### 1. Install plugin
Install
```js
import VuePreflight from 'vue-preflight';
...
const vueProgressbarConfig = {
  color: '#e53935', // Material design red 600
  failedColor: '#7CB342', // Material design lightGreen 600
  thickness: '5px',
  autoFinish: false
}

Vue.use(VuePreflight, vueProgressbarConfig);
```
Mount progress bar in route component
```vue
<template>
  <div id="app">
    ...
    <vue-progress-bar></vue-progress-bar>
  </div>
</template>
```

#### 2. Set in router
```js
import store from '{path-to-vuex-store}';
import { preflight, withProgress } from 'vue-preflight';
const withPreflight = preflight(store);
// ...
const router = new Router({
  routes: [withPreflight({ // Wraps route definition subtree in which you want
    path: '/',             // $_preflight to be enabled
    children: [...]
  }]
};

withProgress(router); // Sets progress bar controls on global navigation hooks
```
#### 3. Use `$_preflight` in component:
```vue
<script>
export default {
  /**
   * @function $_preflight
   * @param {Object} options
   * @param {Object} options.$store Vuex store
   * @param {Object} options.route Target route
   * @returns {Promise | Object} Object or promise of an object to be
   * assigned to component instance upon creation
   */
  $_preflight() {
    return doAsyncStuff().then(data => data);
  }
</script>
```
