<template>
  <ValidationObserver v-slot="{ invalid }">
    <form class="ida-filter" name="ida-filter" @submit.prevent="addCatalogItem">
      <label for="ida-filter__name" class="ida-filter__label">
        <p class="ida-filter__inputHeader">
          Наименование товара <span><img src="@/static/catalog/important.svg" alt="important"></span>
        </p>
      </label>
      <ValidationProvider
        v-slot="{ errors }"
        name="ida-filter__name"
        rules="required"
      >
        <span class="ida-filter__error">{{ errors[0] }}</span>
        <input
          id="ida-filter__name"
          v-model="itemName"
          name="ida-filter__name"
          type="text"
          class="ida-filter__input ida-filter__name"
          placeholder="Введите наименование товара"
        >
      </ValidationProvider>
      <label for="ida-filter__description" class="ida-filter__label">
        <p class="ida-filter__inputHeader">
          Описание товара
        </p>
      </label>
      <textarea
        id="ida-filter__description"
        v-model="itemDescription"
        name="ida-filter__description"
        class="ida-filter__input ida-filter__description textarea"
        rows="7"
        placeholder="Введите описание товара"
      />
      <label for="ida-filter__photoLink" class="ida-filter__label">
        <p class="ida-filter__inputHeader">
          Ссылка на изображение товара<span><img src="@/static/catalog/important.svg" alt="important"></span>
        </p>
      </label>
      <ValidationProvider
        v-slot="{ errors }"
        name="ida-filter__photoLink"
        rules="required"
      >
        <span class="ida-filter__error">{{ errors[0] }}</span>
        <input
          id="ida-filter__photoLink"
          v-model="photoLink"
          name="ida-filter__photoLink"
          type="text"
          class="ida-filter__input ida-filter__photoLink"
          placeholder="Введите ссылку"
        >
      </ValidationProvider>
      <label for="ida-filter__price" class="ida-filter__label">
        <p class="ida-filter__inputHeader">
          Цена товара<span><img src="@/static/catalog/important.svg" alt="important"></span>
        </p>
      </label>

      <ValidationProvider
        v-slot="{ errors }"
        name="ida-filter__price"
        rules="required"
      >
        <span class="ida-filter__error">{{ errors[0] }}</span>
        <input
          id="ida-filter__price"
          v-model="itemPrice"
          name="ida-filter__price"
          type="number"
          class="ida-filter__input ida-filter__price"
          placeholder="Введите цену"
        >
      </ValidationProvider>
      <button
        class="ida-filter__addCatalogItemButton btn"
        :disabled="invalid"
      >
        Добавить товар
      </button>
      <div class="ida-filter__success">
        <h2 class="ida-filter__success_header">
          Товар успешно добавлен
        </h2>
      </div>
    </form>
  </ValidationObserver>
</template>

<script>
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate'
import { required } from 'vee-validate/dist/rules'
import { mapState, mapMutations } from 'vuex'

extend('required', {
  ...required,
  message: 'Это поле необходимо заполнить',
  computesRequired: true
})

export default {
  name: 'IdaFilter',
  components: {
    ValidationProvider,
    ValidationObserver
  },

  data () {
    return {
      itemName: '',
      itemDescription: '',
      photoLink: '',
      itemPrice: null,
      formErrors: 3
    }
  },
  computed: mapState(['randomArticles']),
  mounted () {
    this.setFilterStatic()
  },
  methods: {
    ...mapMutations(['addNewCatalogItem']),
    addCatalogItem () {
      const addSuccess = document.querySelector('.ida-filter__success')
      addSuccess.classList.add('addSuccess')
      setTimeout(() => {
        const form = document.forms['ida-filter']
        const newCatalogItem = {
          name: this.itemName,
          photo: this.photoLink,
          description: this.itemDescription,
          price: this.itemPrice,
          article: this.generateArticle(999, 999999999)
        }
        this.$store.commit('addNewCatalogItem', newCatalogItem)
        this.$store.commit('saveCatalogToLocalStorage')
        form.reset()
        addSuccess.classList.remove('addSuccess')
        form.reset()
      }, 500)
    },
    generateArticle (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min
    },
    setFilterStatic () {
      const filterBlock = document.querySelector('.ida-filter')
      window.addEventListener('scroll', () => {
        if (Math.round(window.scrollY) > 60) {
          filterBlock.classList.add('filter-fixed')
        } else if (Math.round(window.scrollY) < 60) {
          filterBlock.classList.remove('filter-fixed')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/variables';
  .ida-filter {
    position: relative;
    height: 100%;
    max-width: 332px;
    padding: $margin * 2;
    border-radius: $radius;
    background-color: $white;
    &__label {
      display: flex;
      flex-direction: column;
    }
    &__label:not(:last-child) {
      input {
        margin-bottom: $margin;
      }
    }
    &__inputHeader {
      position: relative;
      display: inline-block;
      font-size: 10px;
      font-weight: normal;
      line-height: 13px;
      color: $blackInputHeaders;
        span {
          position: absolute;
          top: 0;
        }
    }
    &__input {
      width: 100%;
      padding: 10px 16px;
      margin-bottom: $margin;
      box-shadow: 0 2px 5px 0 rgba($black, .1);
    }
    &__input, &__input::placeholder {
      font-size: 12px;
      line-height: 13px;
      color: $greys;
    }
    &__addCatalogItemButton {
      padding: 10px 90px;
      background-color: $backGround;
      font-family: Inter;
      font-style: normal;
      font-weight: 600;
      font-size: 12px;
      line-height: 15px;
      color: $blackInputHeaders;
      &:disabled {
        background-color: $buttonDisabled;
        color: $greys;
      }
    }
    textarea {
      resize: none;
      margin-bottom: 20px;
    }
    &__error {
      font-size: 10px;
      color: $error;
    }
    &__success {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      display: none;
      justify-content: center;
      align-items: center;
      opacity: 0;
      background-color: $white;
      z-index: 999;
      animation: addSuccess .2s ease-in-out;
    }
  }
  .filter-fixed {
    position: fixed;
    top: 24px;
    left: 32px;
    max-height: 440px;
  }
  .ida-filter-show {
    display: block!important;
    position: absolute;
    left: 10%;
    z-index: 999;
  }
@media (max-width: 780px) {
  .ida-filter {
    display: none;
    height: 70%;
    max-width: 600px;
    width: 600px;
    input {
      width: 100%;
    }
  }
}
@media (max-width: 430px) {
  .ida-filter {
    max-width: 332px;
    width: 332px;
  }
}
@media (max-width: 380px) {
  .ida-filter {
    left: 5%;
  }
}
@media (max-width: 330px) {
  .ida-filter {
    left: 3%;
    height: 75%;
    width: 95%;
    &__addCatalogItemButton {
      width: 100%;
      padding: 10px 75px;
    }
  }
}
</style>
