<template>
  <IdaCatalog />
</template>

<script>
import { mapState } from 'vuex'
import IdaCatalog from '@/components/Catalog/'

export default {
  components: {
    IdaCatalog
  },
  computed: mapState(['catalog']),
  beforeMount () {
    this.pushCatalogToLocal()
  },
  methods: {
    pushCatalogToLocal () {
      this.$store.commit('saveCatalogToLocalStorage')
    }
  }
}
</script>
