<template>
  <div class="ida-catalog">
    <ida-filter />
    <ida-catalog-item />
  </div>
</template>

<script>
import IdaCatalogItem from '@/components/Catalog/ida-catalog-item'
import IdaFilter from '@/components/ida-filter'

export default {
  name: 'Index',
  components: {
    IdaFilter,
    IdaCatalogItem
  }
}
</script>

<style lang="scss">
  .ida-catalog {
    display: flex;
  }
</style>
