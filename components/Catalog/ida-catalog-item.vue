<template>
  <div class="ida-catalog-item">
    <div class="ida-catalog-item__deleteItemBtn" @click="deleteItem(item, item.article); isActive = !isActive">
      <img src="@/static/catalog/delete.svg" alt="delete" class="ida-catalog-item__deleteItemBtn__img">
    </div>
    <div class="ida-catalog-item__wrapper" :class="{blur: isActive}">
      <div class="ida-catalog-item__imageWrapper">
        <img :src="item.photo" alt="" class="ida-catalog-item__imageWrapper_img">
      </div>
      <div class="ida-catalog-item__text">
        <p class="ida-catalog-item__text_name">
          {{ item.name }}
        </p>
        <p class="ida-catalog-item__text_description">
          {{ item.description }}
        </p>
        <p class="ida-catalog-item__text_price">
          {{ item.price }} руб.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IdaCatalogItem',
  props: {
    item: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      isActive: false
    }
  },
  methods: {
    deleteItem (item, article) {
      setTimeout(() => {
        this.$store.commit('deleteItem', article)
        this.$store.commit('saveCatalogToLocalStorage')
        this.isActive = !this.isActive
      }, 500)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/variables';
  .ida-catalog-item {
    position: relative;
    max-width: 332px;
    width: 100%;
    box-shadow: 0 6px 10px 0 rgba($black, .2);
    cursor: pointer;
    transition: all .2s ease-in-out;
    &__deleteItemBtn {
      display: none;
      position: absolute;
      top: -10px;
      right: -10px;
      z-index: 999;
      padding: 8px;
      border-radius: 10px;
      background-color: $deleteBtnBackground;
      cursor: pointer;
      transition: background-color .2s ease-in-out;
      &_img {
        height: 16px;
        width: 16px;
      }
      &:hover {
        background-color: darken(red, .8);
      }
      &:active {
        background-color: lighten($black, .9);
      }
    }
    &__wrapper {
      display: flex;
      flex: 1;
      justify-content: space-between;
      flex-direction: column;
      height: 100%;
      max-width: 332px;
    }
    &__imageWrapper {
      height: 222px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-shrink: 0;
      border-radius: 4px 4px 0 0;
      overflow: hidden;
      &_img {
        height: 100%;
        width: 100%;
      }
    }
    &__text {
      justify-content: space-between;
      display: flex;
      flex-direction: column;
      height: 100%;
      padding: $margin $margin 24px;
      border-radius: 0 0 4px 4px;
      font-style: normal;
      font-weight: normal;
      background-color: $white;
      &_name {
        font-size: 20px;
        font-weight: 600;
        line-height: 25px;
      }
      &_description {
        margin: $margin 0 ($margin * 2);
        font-size: 16px;
        line-height: 20px;
        overflow-wrap: break-word;
      }
      &_price {
        font-size: 24px;
        font-weight: 600;
        line-height: 30px;
      }
    }
    &:hover {
      box-shadow: 0 6px 10px 2px rgba($black, .6);
      .ida-catalog-item__deleteItemBtn {
        display: block;
      }
    }
  }
@media (max-width: 1420px) {
  .ida-catalog-item {
    max-width: 315px;
  }
}
@media (max-width: 1380px) {
  .ida-catalog-item {
    max-width: 305px;
  }
}
@media (max-width: 380px) {
  .ida-catalog-item {
    width: 100%;
  }
}
</style>
