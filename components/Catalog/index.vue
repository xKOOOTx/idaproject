<template>
  <div class="ida-catalog">
    <ida-header />
    <div class="ida-catalog__wrapper">
      <div class="ida-catalog__filterWrapper">
        <ida-filter />
      </div>
      <div class="ida-catalog__itemsWrapper">
        <ida-catalog-item
          v-for="(item, idx) in catalog"
          :key="idx"
          :item="item"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import IdaHeader from '@/components/ida-header'
import IdaCatalogItem from '@/components/Catalog/ida-catalog-item'
import IdaFilter from '@/components/ida-filter'

export default {
  name: 'Index',
  components: {
    IdaHeader,
    IdaFilter,
    IdaCatalogItem
  },
  computed: mapState(['catalog']),
  beforeMount () {
    setTimeout(() => {
      this.checkLocalStorage()
    }, 1000)
  },
  methods: {
    checkLocalStorage () {
      if (localStorage.getItem('catalog') != null) {
        const newCatalog = JSON.parse(localStorage.getItem('catalog'))
        this.$store.commit('setLocalStorage', newCatalog)
      } else {
        console.log(this.$state.catalog)
        // this.$store.commit('setLocalStorage', this.$state.catalog)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/variables.scss';
  .ida-catalog {
    padding: 32px;
    background-color: $backGround;
    &__wrapper {
      display: flex;
      justify-content: space-between;
    }
    &__filterWrapper {
      height: 100%;
      flex-shrink: 0;
      width: 348px;
    }
    &__itemsWrapper {
      height: 100%;
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      position: relative;
      column-gap: 16px;
      row-gap: 16px;
    }
  }
  @media (max-width: 1600px) {
    .ida-catalog {
      &__itemsWrapper {
        column-gap: 10px;
      }
    }
  }
@media (max-width: 1050px) {
  .ida-catalog {
    &__filterWrapper {
      width: 340px;
    }
    &__wrapper {
      display: flex;
      flex-direction: row;
    }
    &__itemsWrapper {
      justify-content: center;
    }
  }
}
  @media (max-width: 780px) {
    .ida-catalog {
      &__wrapper {
        display: block;
      }
    }
  }
  @media (max-width: 430px) {
    .ida-catalog {
      padding: 24px;
      &__wrapper {
        display: flex;
        flex-direction: column;
      }
      &__itemsWrapper {
        justify-content: center;
      }
    }
  }
</style>
