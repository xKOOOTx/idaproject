export const IdaFilter = () => import('../..\\components\\ida-filter.vue' /* webpackChunkName: "components/ida-filter" */).then(c => wrapFunctional(c.default || c))
export const IdaHeader = () => import('../..\\components\\ida-header.vue' /* webpackChunkName: "components/ida-header" */).then(c => wrapFunctional(c.default || c))
export const CatalogIdaCatalogItem = () => import('../..\\components\\Catalog\\ida-catalog-item.vue' /* webpackChunkName: "components/catalog-ida-catalog-item" */).then(c => wrapFunctional(c.default || c))
export const Catalog = () => import('../..\\components\\Catalog\\index.vue' /* webpackChunkName: "components/catalog" */).then(c => wrapFunctional(c.default || c))

// nuxt/nuxt.js#8607
function wrapFunctional(options) {
  if (!options || !options.functional) {
    return options
  }

  const propKeys = Array.isArray(options.props) ? options.props : Object.keys(options.props || {})

  return {
    render(h) {
      const attrs = {}
      const props = {}

      for (const key in this.$attrs) {
        if (propKeys.includes(key)) {
          props[key] = this.$attrs[key]
        } else {
          attrs[key] = this.$attrs[key]
        }
      }

      return h(options, {
        on: this.$listeners,
        attrs,
        props,
        scopedSlots: this.$scopedSlots,
      }, this.$slots.default)
    }
  }
}
