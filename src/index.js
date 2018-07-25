import { isFunction, isUndefined, last } from './helpers';
import VueProgressBar from 'vue-progressbar';

const noop = () => {};
const navigationError = new Error('Route preflight data fetch failed!');

const progressBarConfig = (config = {}) => Object.assign({
  color: '#e53935', // Material design red 600
  failedColor: '#7CB342', // Material design lightGreen 600
  thickness: '5px',
  autoFinish: false
}, config);

function mixin($store, { name, $_preflight: preflight = noop } = {}) {
  return {
    beforeRouteEnter(to, from, next) {
      Promise.resolve(preflight({ $store, route: to }))
        .then(data => next(vm => data && setPreflightData(vm, data)))
        .catch(() => next(navigationError));
    },
    beforeRouteUpdate(to, from, next) {
      const targetComponent = last(to.matched) || {};
      const isTargetComponent = targetComponent.name === name;
      const isSameRoute = to.name === from.name;
      if (!isTargetComponent || !isSameRoute) return next();
      Promise.resolve(preflight({ $store, route: to }))
        .then(data => data && setPreflightData(this, data))
        .then(() => next())
        .catch(() => next(navigationError));
    }
  };
}

export const preflight = $store => function init(route = {}) {
  const { component = {}, children } = route;
  const { $_preflight: preflight, mixins = [] } = component;
  if (preflight && isFunction(preflight)) {
    component.mixins = [...mixins, mixin($store, component)];
  }
  if (!children) return route;
  route.children = children.map(it => init(it));
  return route;
};

export function withProgress(router) {
  router.beforeEach((to, from, next) => {
    router.app.$Progress.start();
    next();
  });
  router.afterEach((to, from) => router.app.$Progress.finish());
  router.onError((to, from) => router.app.$Progress.fail());
}

export default {
  install(Vue, config) {
    Vue.use(VueProgressBar, progressBarConfig(config));
  }
};

function setPreflightData(vm, data) {
  Object.keys(data).forEach(key =>
    !isUndefined(vm[key]) && vm.$set(vm, key, data[key]));
}
