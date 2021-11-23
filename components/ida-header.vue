<template>
  <div class="ida-header">
    <h1 class="ida-header__header">
      Добавление товара
    </h1>
    <h1 class="ida-header__header ida-header__header_mobile" @click="showFilter">
      Добавление товара
      <span>
        press me to open / close
      </span>
    </h1>
    <select class="ida-header__sort" @change="getValue">
      <option value="default">
        По умолчанию
      </option>
      <option value="high-to-low">
        Цена по убыванию
      </option>
      <option value="low-to-high">
        Цена по возрастанию
      </option>
      <option value="a-z">
        По имени а-я
      </option>
      <option value="z-a">
        По имени я-а
      </option>
    </select>
  </div>
</template>

<script>

import { mapMutations } from 'vuex'

export default {
  name: 'IdaHeader',
  methods: {
    ...mapMutations(['sortCatalog']),
    showFilter () {
      const filterBlock = document.querySelector('.ida-filter')

      filterBlock.classList.toggle('ida-filter-show')
      if (filterBlock.classList.contains('ida-filter-show')) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = 'auto'
      }
    },
    getValue () {
      const select = document.querySelector('.ida-header__sort')
      const catalogWrapper = document.querySelector('.ida-catalog__itemsWrapper')
      catalogWrapper.classList.add('catalogBlur')
      setTimeout(() => {
        this.$store.commit('sortCatalog', select.value)
        catalogWrapper.classList.remove('catalogBlur')
      }, 1000)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/variables';
  .ida-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 16px;
    &__header {
      font-size: 28px;
      font-weight: 600;
      line-height: 35px;
      &_mobile {
        display: none;
        line-height: 18px;
        border-radius: $radius;
        background-color: $greys;
        padding: 4px;
        span {
          display: block;
          font-size: 8px;
          text-align: center;
        }
      }
    }
    &__sort {
      padding: 10px 0 10px 16px;
      font-size: 12px;
      font-weight: normal;
      font-style: normal;
      line-height: 15px;
      color: $greys;
      border: none;
      border-radius: $radius;
      &:focus,
      &:active {
        border: none;
        outline: none;
      }
    }
  }
  @media (max-width: 780px) {
    .ida-header {
      &__header {
        font-size: 20px;
      }
      &__header {
        display: none;
        &_mobile {
          display: block;
        }
      }
    }
  }
  @media (max-width: 380px) {
    .ida-header {
      display: block;
      &__header {
        text-align: center;
        margin-bottom: 10px;
      }
      &__sort {
        width: 100%;
      }
    }
  }
</style>
